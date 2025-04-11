using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class JobPostCreateDto
    {
        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        public int DistrictId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string JobTitle { get; set; } = null!;

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string JobLocation { get; set; } = null!;

        [Required]
        [StringLength(5000, MinimumLength = 10)]
        public string JobDescription { get; set; } = null!;

        [Required]
        public string EmploymentType { get; set; } = null!;

        [Required]
        [StringLength(1000, MinimumLength = 5)]
        public string ApplicationProcess { get; set; } = null!;

        [Required]
        public long ApplicationDeadlineUnix { get; set; }

        [StringLength(1000)]
        public string? AdditionalBenefits { get; set; }

        [Required]
        public string GenderRequirement { get; set; } = null!;

        [Required]
        [Range(14, 60)]
        public int MinAge { get; set; }

        [Range(14, 65)]
        public int? MaxAge { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal SalaryMin { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal SalaryMax { get; set; }

        [Required]
        public bool AccommodationProvided { get; set; }

        [Range(1, 1000)]
        public int? Vacancies { get; set; }

        [StringLength(1000)]
        public string? FacilitiesProvided { get; set; }

        [Required]
        [Range(1, 12)]
        public int WorkingHoursMin { get; set; }

        [Range(1, 16)]
        public int? WorkingHoursMax { get; set; }

        [Required]
        [Range(0, 40)]
        public int ExperienceMin { get; set; }

        [Range(0, 50)]
        public int? ExperienceMax { get; set; }

        [Required]
        public bool ApprenticesConsidered { get; set; }

        [Required]
        public bool Urgent { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one trade must be selected.")]
        public List<int> TradeIds { get; set; } = new();
    }
}
