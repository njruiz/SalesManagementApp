using API.Entities;

namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Flavor { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string Size { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotoProduct> Photos { get; set; }
    }
}