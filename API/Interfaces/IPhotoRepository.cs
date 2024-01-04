using API.DTOs;
using API.Entities;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        Task<Photo> GetPhotoById(int id);
        Task<PhotoProduct> GetProductPhotoByCode(string productCode);
        void RemovePhoto(Photo photo);
        void RemoveProductPhoto(PhotoProduct photoProduct);
        void UpdateProductCode(PhotoProduct photoProduct, string newProductCode);
        void UpdateProductPhoto(PhotoProduct photoProduct, ImageUploadResult updatedPhoto);
    }
}