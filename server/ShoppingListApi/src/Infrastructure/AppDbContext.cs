using Microsoft.EntityFrameworkCore;
using ShoppingListApi.Domain.Entities;

namespace ShoppingListApi.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(b =>
        {
            b.ToTable("Categories");
            b.HasKey(x => x.Id);
            b.Property(x => x.Name).IsRequired().HasMaxLength(200);
            b.HasMany(x => x.Products)
             .WithOne(p => p.Category!)
             .HasForeignKey(p => p.CategoryId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity(ProductModel());
    }

    private static Action<Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product>> ProductModel()
        => b =>
        {
            b.ToTable("Products");
            b.HasKey(x => x.Id);
            b.Property(x => x.Name).IsRequired().HasMaxLength(300);
            b.Property(x => x.Sku).HasMaxLength(64);
            b.Property(x => x.UnitPrice).HasColumnType("decimal(18,2)");
            b.HasIndex(x => new { x.CategoryId, x.Name }).IsUnique(false);
        };
}
