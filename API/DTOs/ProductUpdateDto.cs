using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProductUpdateDto
    {
        public string Category { get; set; }
        public string Flavor { get; set; }
        public string Size { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
    }
}