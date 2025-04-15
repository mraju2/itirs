using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SkillConnect.Models.Enums;

namespace SkillConnect.Dtos
{
    public class JobPostUpdateDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        public int DistrictId { get; set; }

        [Required]
        public string JobTitle { get; set; } = null!;

        [Required]
        public string JobLocation { get; set; } = null!;

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

        public bool AccommodationProvided { get; set; }

        [Required]
        public int WorkingHoursMin { get; set; }

        [Required]
        public int WorkingHoursMax { get; set; }

        [Required]
        public int ExperienceMin { get; set; }

        public int? ExperienceMax { get; set; }

        public bool ApprenticesConsidered { get; set; }

        public bool Urgent { get; set; }

        public int? Vacancies { get; set; }

        public string? FacilitiesProvided { get; set; }

        [Required]
        public List<int> TradeIds { get; set; } = new();

        [Required]
        public JobPostStatus Status { get; set; }
    }
}
