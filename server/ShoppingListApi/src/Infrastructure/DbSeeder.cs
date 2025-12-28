using Microsoft.EntityFrameworkCore;
using ShoppingListApi.Domain.Entities;

namespace ShoppingListApi.Infrastructure;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db, CancellationToken ct = default)
    {
        // Apply migrations
        await db.Database.MigrateAsync(ct);

        // Seed Categories and Products only if empty
        if (!await db.Categories.AnyAsync(ct))
        {
            var categories = new List<Category>
            {
                new() { Name = "Beverages" },
                new() { Name = "Snacks" },
                new() { Name = "Produce" },
                new() { Name = "Bakery" },
            };

            await db.Categories.AddRangeAsync(categories, ct);
            await db.SaveChangesAsync(ct);

            var beveragesId = categories.First(c => c.Name == "Beverages").Id;
            var snacksId = categories.First(c => c.Name == "Snacks").Id;
            var produceId = categories.First(c => c.Name == "Produce").Id;
            var bakeryId = categories.First(c => c.Name == "Bakery").Id;

            var products = new List<Product>
            {
                new() { CategoryId = beveragesId, Name = "Coffee Beans", Sku = "BEV-COF-001", UnitPrice = 12.99m },
                new() { CategoryId = beveragesId, Name = "Green Tea", Sku = "BEV-TEA-002", UnitPrice = 6.49m },
                new() { CategoryId = snacksId, Name = "Potato Chips", Sku = "SNK-CHP-010", UnitPrice = 2.99m },
                new() { CategoryId = snacksId, Name = "Granola Bar", Sku = "SNK-GRA-011", UnitPrice = 1.49m },
                new() { CategoryId = produceId, Name = "Bananas", Sku = "PRO-BAN-020", UnitPrice = 0.49m },
                new() { CategoryId = produceId, Name = "Apples", Sku = "PRO-APP-021", UnitPrice = 0.79m },
                new() { CategoryId = bakeryId, Name = "Whole Wheat Bread", Sku = "BAK-BRD-030", UnitPrice = 3.25m },
                new() { CategoryId = bakeryId, Name = "Croissant", Sku = "BAK-CRS-031", UnitPrice = 2.10m },
            };

            await db.Products.AddRangeAsync(products, ct);
            await db.SaveChangesAsync(ct);
        }
    }
}
