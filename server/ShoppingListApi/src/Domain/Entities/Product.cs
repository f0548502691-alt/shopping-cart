namespace ShoppingListApi.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Sku { get; set; }
    public decimal UnitPrice { get; set; }

    public Category? Category { get; set; }
}
