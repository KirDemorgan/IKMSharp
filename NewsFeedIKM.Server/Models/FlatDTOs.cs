namespace NewsFeedIKM.Server.Models
{
    public class FlattenedPostDto
    {
        public int PostId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public List<FlattenedCommentDto> Comments { get; set; } = new List<FlattenedCommentDto>();
        public List<FlattenedLikeDto> Likes { get; set; } = new List<FlattenedLikeDto>();
    }

    public class FlattenedCommentDto
    {
        public int CommentId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }

    public class FlattenedLikeDto
    {
        public int LikeId { get; set; }
        public int AuthorId { get; set; }
        public string AuthorUsername { get; set; } = null!;
        public string Type { get; set; } = null!;
    }
}