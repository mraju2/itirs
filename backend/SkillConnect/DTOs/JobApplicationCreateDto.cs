using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class JobApplicationCreateDto
    {
        [Required]
        public Guid UserId { get; set; }
        public required Guid JobPostId { get; set; }
        public string ApplicantName { get; set; } = null!;
        public string ApplicantPhone { get; set; } = null!;
        public string? ApplicantEmail { get; set; }
    }
}