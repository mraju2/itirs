using System.ComponentModel.DataAnnotations;
using SkillConnect.Models;

namespace SkillConnect.Models
{
    public class JobPost
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();


        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public string JobTitle { get; set; } = null!;

        [Required]
        public string District { get; set; } = null!;

        [Required]
        public string Location { get; set; } = null!;

        [Required]
        public string JobDescription { get; set; } = null!;

        [Required]
        public string EmploymentType { get; set; } = null!;

        [Required]
        public string ApplicationProcess { get; set; } = null!;

        [Required]
        public long ApplicationDeadlineUnix { get; set; }

        public string? AdditionalBenefits { get; set; }

        [Required]
        public string GenderRequirement { get; set; } = null!;

        [Required]
        public int MinAge { get; set; }
        public int? MaxAge { get; set; }

        [Required]
        public decimal SalaryMin { get; set; }

        [Required]
        public decimal SalaryMax { get; set; }

        [Required]
        public bool AccommodationProvided { get; set; }

        [Required]
        public int WorkingHoursMin { get; set; }

        [Required]
        public int WorkingHoursMax { get; set; }

        [Required]
        public int ExperienceMin { get; set; }
        public int? ExperienceMax { get; set; }

        [Required]
        public bool ApprenticesConsidered { get; set; }

        [Required]
        public bool Urgent { get; set; }

        public long CreatedAtUnix { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        public long? ModifiedAtUnix { get; set; }

        // Navigation
        public Company Company { get; set; } = null!;
        public List<JobApplication> Applications { get; set; } = new();
        public List<JobPostTrade> JobPostTrades { get; set; } = new();
    }

}
