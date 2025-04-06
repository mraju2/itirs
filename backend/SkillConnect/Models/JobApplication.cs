using System.ComponentModel.DataAnnotations;
using SkillConnect.Models;

namespace SkillConnect.Models
{
    public class JobApplication
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }  // ✅ Fix: Use Guid

        [Required]
        public Guid JobPostId { get; set; }

        [Required]
        public string ApplicantName { get; set; } = null!;

        [Required]
        public string ApplicantPhone { get; set; } = null!;

        public string? ApplicantEmail { get; set; }

        public long AppliedAtUnix { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        // Navigation
        public JobPost JobPost { get; set; } = null!;
        public UserModel User { get; set; } = null!; // 👈 Add this

    }

}
