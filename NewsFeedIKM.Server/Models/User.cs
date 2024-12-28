using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsFeedIKM.Server.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MinLength(1, ErrorMessage = "Username cannot be empty.")]
        public string Username { get; set; } = null!;
        public string? Surname { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; } = null!;
        [MinLength(1, ErrorMessage = "Password cannot be empty.")]
        public string Password { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<Like> Likes { get; set; } = new List<Like>();
    }
}