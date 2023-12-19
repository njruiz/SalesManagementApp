using API.Entities;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        Task<Photo> GetPhotoById(int id);
        Task<PhotoProduct> GetProductPhotoByCode(string productCode);
        void RemovePhoto(Photo photo);
        void RemoveProductPhoto(PhotoProduct photoProduct);
        void UpdateProductCode(PhotoProduct photoProduct, string newProductCode);
    }
}