using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string ContactNumber { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public List<Photo> Photos { get; set; } = new();

    public ICollection<AppUserRole> UserRoles { get; set; }
}