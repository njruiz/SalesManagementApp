using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos_Product")]
    public class PhotoProduct
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public string ProductCode { get; set; }
    }
}