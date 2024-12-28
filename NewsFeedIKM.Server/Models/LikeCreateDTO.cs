namespace NewsFeedIKM.Server.Models
{
    public class LikeCreateDto
    {
        public int PostId { get; set; }
        public int AuthorId { get; set; }
        public string Type { get; set; } = null!;
    }
}