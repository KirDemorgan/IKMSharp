namespace NewsFeedIKM.Server.Models
{
    public class CommentCreateDto
    {
        public string Content { get; set; } = null!;
        public int PostId { get; set; }
    }
}