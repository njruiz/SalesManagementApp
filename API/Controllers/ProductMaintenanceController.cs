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
        private readonly IPhotoService _photoService;

        public ProductMaintenanceController(DataContext context, IMapper mapper,
            IUnitOfWork unitOfWork, IPhotoService photoService)
        {
            _photoService = photoService;
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

        [HttpGet("{productCode}", Name = "GetProductPhoto")]
        public async Task<ActionResult<PhotoProduct>> GetProductPhoto(string productCode)
        {
            return await _unitOfWork.PhotoRepository.GetProductPhotoByCode(productCode);
        }

        [HttpPut("{productCode}")]
        public async Task<ActionResult> UpdateProduct(ProductUpdateDto productUpdateDto, string productCode)
        {
            var product = await _unitOfWork.ProductRepository.GetProductAsync(productCode);

            _mapper.Map(productUpdateDto, product);

            var result = _unitOfWork.ProductRepository.Update(product);
            if (result)
            {
                if (product.Photos.Count > 0)
                {
                    var photoProduct = await _unitOfWork.PhotoRepository.GetProductPhotoByCode(productCode);
                    _unitOfWork.PhotoRepository.UpdateProductCode(photoProduct, product.ProductCode);
                }
            }

            if (await _unitOfWork.Complete())
            {
                var products = await _unitOfWork.ProductRepository.GetProductsAsync();
                return Ok(products);
            }

            return BadRequest("Failed to update product");
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

        [HttpPost("{productCode}/add-photo")]
        public async Task<ActionResult<PhotoProductDto>> AddPhoto(IFormFile file, string productCode)
        {
            var product = await _unitOfWork.ProductRepository.GetProductAsync(productCode);

            if (product == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new PhotoProduct
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                ProductCode = productCode
            };

            product.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtAction(nameof(GetProduct),
                    new { productCode = product.ProductCode }, _mapper.Map<PhotoProductDto>(photo));
            }

            return BadRequest("Problem adding product photo");
        }

        [HttpPost("{productCode}/update-photo")]
        public async Task<ActionResult<PhotoProductDto>> UpdatePhoto(IFormFile file, string productCode)
        {
            var photo = await _unitOfWork.PhotoRepository.GetProductPhotoByCode(productCode);

            if (photo == null) return NotFound();

            var updatedPhoto = await _photoService.UpdatePhotoAsync(file, photo.PublicId);

            if (updatedPhoto != null)
            {
                _unitOfWork.PhotoRepository.UpdateProductPhoto(photo, updatedPhoto);
            }

            if (updatedPhoto.Error != null) return BadRequest(updatedPhoto.Error.Message);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtAction(nameof(GetProductPhoto),
                    new { productCode = photo.ProductCode }, _mapper.Map<PhotoProductDto>(photo));
            }
            return Ok();
        }

        private async Task<bool> ProductExists(string productCode)
        {
            return await _context.Products.AnyAsync(x => x.ProductCode == productCode);
        }
    }
}