using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsFeedIKM.Server.Models
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }
        [MinLength(1, ErrorMessage = "Content cannot be empty.")]
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Range(1, int.MaxValue, ErrorMessage = "PostId must be a positive number.")]
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;
    }
}