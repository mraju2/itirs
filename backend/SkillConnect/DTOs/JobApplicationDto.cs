using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class JobApplicationDto
    {
        public string Id { get; set; }
        public string JobPostId { get; set; }
        public Guid UserId { get; set; }
        public string ApplicantName { get; set; } = null!;
        public string ApplicantPhone { get; set; } = null!;
        public string? ApplicantEmail { get; set; }
        public long AppliedAtUnix { get; set; }
    }
}