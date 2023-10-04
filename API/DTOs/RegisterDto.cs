using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Address { get; set; }
        [Required] public string ContactNumber { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 4)]
        public string Password { get; set; }
    }
}