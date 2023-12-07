using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Delete(Product product)
        {
            _context.Products.Remove(product);
        }

        public async Task<Product> GetProductAsync(string productCode)
        {
            return await _context.Products
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.ProductCode == productCode);
        }

        public async Task<ProductDto> GetProductByCodeAsync(string productCode)
        {
            return await _context.Products
                .Where(x => x.ProductCode == productCode)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ProductDto>> GetProductsAsync()
        {
            return await _context.Products
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void Update(Product product)
        {
            product.ProductName = GenerateProductName(product);
            product.ProductCode = GenerateProductCode(product);
            _context.Entry(product).State = EntityState.Modified;
        }

        public string GenerateProductName(Product product)
        {
            return product.Flavor + " " + product.Category;
        }

        public string GenerateProductCode(Product product)
        {
            var initials = Getinitials(product.ProductName);
            return product.Flavor.Length.ToString() + initials + '-' + Getinitials(product.Size);
        }

        public string Getinitials(String word)
        {
            return string.Concat(word
                .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Where(x => x.Length >= 1 && char.IsLetter(x[0]))
                .Select(x => char.ToUpper(x[0])));
        }
    }
}