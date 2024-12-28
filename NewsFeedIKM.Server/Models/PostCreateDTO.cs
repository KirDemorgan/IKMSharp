namespace NewsFeedIKM.Server.Models
{
    public class PostCreateDto
    {
        public string Content { get; set; } = null!;
        public int UserId { get; set; }
    }
}