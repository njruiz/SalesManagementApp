using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductMaintenanceController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public ProductMaintenanceController(DataContext context, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create-product")]
        public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            product.ProductName = _unitOfWork.ProductRepository.GenerateProductName(product);
            product.ProductCode = _unitOfWork.ProductRepository.GenerateProductCode(product);

            if (await ProductExists(product.ProductCode)) return BadRequest("Product is already added");

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return new ProductDto
            {
                Id = product.Id,
                Category = product.Category,
                Flavor = product.Flavor,
                ProductName = product.ProductName,
                ProductCode = product.ProductCode,
                Size = product.Size,
                Price = product.Price,
                Description = product.Description
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _unitOfWork.ProductRepository.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("{productCode}", Name = "GetProduct")]
        public async Task<ActionResult<ProductDto>> GetProduct(string productCode)
        {
            return await _unitOfWork.ProductRepository.GetProductByCodeAsync(productCode);

        }

        [HttpPut("{productCode}")]
        public async Task<ActionResult> UpdateCharacter(ProductUpdateDto productUpdateDto, string productCode)
        {
            var product = await _unitOfWork.ProductRepository.GetProductAsync(productCode);

            _mapper.Map(productUpdateDto, product);

            _unitOfWork.ProductRepository.Update(product);

            if (await _unitOfWork.Complete()) return Ok(product);

            return BadRequest("Failed to update user");
        }

        [HttpDelete("delete-product/{productCode}")]
        public async Task<ActionResult> DeleteProduct(string productCode)
        {
            var product = await _unitOfWork.ProductRepository.GetProductAsync(productCode);

            if (product == null) return NotFound("Could not find product");

            _unitOfWork.ProductRepository.Delete(product);

            await _unitOfWork.Complete();
            return Ok();
        }

        private async Task<bool> ProductExists(string productCode)
        {
            return await _context.Products.AnyAsync(x => x.ProductCode == productCode);
        }
    }
}