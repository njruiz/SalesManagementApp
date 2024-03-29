using API.Entities;
using API.Interfaces;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        public PhotoRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Photo> GetPhotoById(int id)
        {
            return await _context.Photos
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PhotoProduct> GetProductPhotoByCode(string productCode)
        {
            return await _context.ProductPhotos
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.ProductCode == productCode);
        }

        public void RemovePhoto(Photo photo)
        {
            _context.Photos.Remove(photo);
        }

        public void RemoveProductPhoto(PhotoProduct photo)
        {
            _context.ProductPhotos.Remove(photo);
        }

        public void UpdateProductCode(PhotoProduct photoProduct, string productCode)
        {
            photoProduct.ProductCode = productCode;

            _context.Entry(photoProduct).State = EntityState.Modified;
        }

        public void UpdateProductPhoto(PhotoProduct photoProduct, ImageUploadResult updatedPhoto)
        {
            photoProduct.PublicId = updatedPhoto.PublicId;
            photoProduct.Url = updatedPhoto.Url.ToString();

            _context.Entry(photoProduct).State = EntityState.Modified;
        }
    }
}