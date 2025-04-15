using SkillConnect.Models.Enums;
namespace SkillConnect.Dtos
{
    public class JobPostStatusUpdateDto
    {
        public Guid JobPostId { get; set; }
        public JobPostStatus Status { get; set; }
        public string? ChangedBy { get; set; } // Optional: Admin userId or "System"
    }
}