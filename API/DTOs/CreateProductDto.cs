using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateProductDto
    {
        [Required] public string Category { get; set; }
        [Required] public string Flavor { get; set; }
        [Required] public string Size { get; set; }
        [Required] public double Price { get; set; }
        public string Description { get; set; }
    }
}