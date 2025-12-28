using Microsoft.EntityFrameworkCore;
using ShoppingListApi.Infrastructure;
using ShoppingListApi.Application;
using ShoppingListApi.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Database: SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// CORS: allow Angular dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevClient", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Cart service
builder.Services.AddSingleton<ICartService, InMemoryCartService>();

// Minimal API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

// Enable CORS
app.UseCors("DevClient");

// Ensure DB is migrated and seeded on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbSeeder.SeedAsync(db);
}

app.MapGet("/api/categories", async (AppDbContext db) =>
{
    var data = await db.Categories
        .Select(c => new
        {
            c.Id,
            c.Name,
            ProductCount = c.Products.Count
        })
        .OrderBy(c => c.Name)
        .ToListAsync();

    return Results.Ok(data);
});

app.MapGet("/api/categories/{categoryId:int}/products", async (int categoryId, AppDbContext db) =>
{
    var exists = await db.Categories.AnyAsync(c => c.Id == categoryId);
    if (!exists) return Results.NotFound($"Category {categoryId} not found.");

    var products = await db.Products
        .Where(p => p.CategoryId == categoryId)
        .OrderBy(p => p.Name)
        .Select(p => new
        {
            p.Id,
            p.Name,
            p.Sku,
            p.UnitPrice
        })
        .ToListAsync();

    return Results.Ok(products);
});

app.MapGet("/api/cart", (HttpContext ctx, ICartService cartSvc) =>
{
    var sid = GetSessionId(ctx);
    var items = cartSvc.GetCart(sid);
    var total = cartSvc.GetTotal(sid);
    return Results.Ok(new { items, total });
});

app.MapPost("/api/cart/items", async (HttpContext ctx, ICartService cartSvc, AppDbContext db, AddToCartRequest req) =>
{
    if (req.Quantity <= 0) return Results.BadRequest("Quantity must be greater than zero.");

    var product = await db.Products
        .Where(p => p.Id == req.ProductId)
        .Select(p => new { p.Id, p.Name, p.UnitPrice })
        .FirstOrDefaultAsync();

    if (product is null) return Results.NotFound($"Product {req.ProductId} not found.");

    var item = new CartItem
    {
        ProductId = product.Id,
        ProductName = product.Name,
        UnitPrice = product.UnitPrice,
        Quantity = req.Quantity
    };

    cartSvc.AddOrUpdateItem(GetSessionId(ctx), item);

    var items = cartSvc.GetCart(GetSessionId(ctx));
    var total = cartSvc.GetTotal(GetSessionId(ctx));
    return Results.Ok(new { items, total });
});

app.MapDelete("/api/cart/items/{productId:int}", (HttpContext ctx, ICartService cartSvc, int productId) =>
{
    cartSvc.RemoveItem(GetSessionId(ctx), productId);
    var items = cartSvc.GetCart(GetSessionId(ctx));
    var total = cartSvc.GetTotal(GetSessionId(ctx));
    return Results.Ok(new { items, total });
});

app.MapDelete("/api/cart", (HttpContext ctx, ICartService cartSvc) =>
{
    cartSvc.Clear(GetSessionId(ctx));
    return Results.NoContent();
});

app.Run();

static string GetSessionId(HttpContext ctx)
{
    if (ctx.Request.Headers.TryGetValue("X-Session-Id", out var sid) && !string.IsNullOrWhiteSpace(sid))
        return sid!;
    return $"{ctx.Connection.RemoteIpAddress}-default";
}

public record AddToCartRequest(int ProductId, int Quantity);
