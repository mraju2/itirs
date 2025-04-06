using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class JobApplicationCreateDto
    {
        public int JobPostId { get; set; }
        public string ApplicantName { get; set; } = null!;
        public string ApplicantPhone { get; set; } = null!;
        public string? ApplicantEmail { get; set; }
    }
}