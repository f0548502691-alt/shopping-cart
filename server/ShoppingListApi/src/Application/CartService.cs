using System.Collections.Concurrent;
using ShoppingListApi.Domain.Entities;

namespace ShoppingListApi.Application;

// Simple per-session cart. Replace with a persistent cart as needed.
public interface ICartService
{
    IReadOnlyCollection<CartItem> GetCart(string sessionId);
    void AddOrUpdateItem(string sessionId, CartItem item);
    void RemoveItem(string sessionId, int productId);
    void Clear(string sessionId);
    decimal GetTotal(string sessionId);
}

public class InMemoryCartService : ICartService
{
    private readonly ConcurrentDictionary<string, ConcurrentDictionary<int, CartItem>> _carts = new();

    public IReadOnlyCollection<CartItem> GetCart(string sessionId)
    {
        var cart = _carts.GetOrAdd(sessionId, _ => new());
        return cart.Values.ToList();
    }

    public void AddOrUpdateItem(string sessionId, CartItem item)
    {
        var cart = _carts.GetOrAdd(sessionId, _ => new());
        cart.AddOrUpdate(item.ProductId, item, (_, existing) =>
        {
            existing.Quantity = item.Quantity; // update to selected quantity
            existing.UnitPrice = item.UnitPrice;
            existing.ProductName = item.ProductName;
            return existing;
        });
    }

    public void RemoveItem(string sessionId, int productId)
    {
        var cart = _carts.GetOrAdd(sessionId, _ => new());
        cart.TryRemove(productId, out _);
    }

    public void Clear(string sessionId)
    {
        _carts.TryRemove(sessionId, out _);
    }

    public decimal GetTotal(string sessionId)
    {
        var cart = _carts.GetOrAdd(sessionId, _ => new());
        decimal total = 0;
        foreach (var item in cart.Values) total += item.LineTotal;
        return total;
    }
}
