using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Delete(Product product);
        bool Update(Product product);
        string GenerateProductName(Product product);
        string GenerateProductCode(Product product);
        string Getinitials(String word);
        Task<IEnumerable<ProductDto>> GetProductsAsync();
        Task<Product> GetProductAsync(string productCode);
        Task<ProductDto> GetProductByCodeAsync(string productCode);
    }
}