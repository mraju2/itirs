using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SkillConnect.Enum;


namespace SkillConnect.Models
{
    public class JobPost
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Location { get; set; }

        public SalaryType SalaryType { get; set; }
        public decimal? SalaryFrom { get; set; }
        public decimal? SalaryTo { get; set; }
        public decimal? FixedSalary { get; set; }

        public int? ExperienceRequired { get; set; }
        public string ITICertifications { get; set; }

        public GenderRequirement GenderRequirement { get; set; }
        public bool IsUrgent { get; set; }

        public string Description { get; set; }
        public string AccommodationDetails { get; set; }

        public VisibilityType Visibility { get; set; }
        public long ApplicationDeadline { get; set; }

        public JobStatus Status { get; set; }
        public long CreatedAt { get; set; }

        // Relationships
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public Guid RecruiterId { get; set; } // Assuming recruiter is a User
        public UserModel Recruiter { get; set; }

        public List<JobApplication> Applications { get; set; } = new();
    }
}
