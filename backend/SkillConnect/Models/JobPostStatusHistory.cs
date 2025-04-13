using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SkillConnect.Models.Enums;

namespace SkillConnect.Models
{
    public class JobPostStatusHistory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid JobPostId { get; set; }

        [ForeignKey("JobPostId")]
        public JobPost JobPost { get; set; } = null!;

        [Required]
        public JobPostStatus Status { get; set; }

        [Required]
        public long ChangedAtUnix { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        [StringLength(100)]
        public string? ChangedBy { get; set; } // optional: Admin userId, System, etc.
    }
}
