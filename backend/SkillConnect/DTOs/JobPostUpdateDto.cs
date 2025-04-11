using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class JobPostUpdateDto
    {
        [Required]
        public int Id { get; set; } // Unique identifier for the JobPost being updated

        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public string JobTitle { get; set; } = null!;

        [Required]
        public string District { get; set; } = null!;

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

        public int? Vacancies { get; set; } // Total positions available


        public string? FacilitiesProvided { get; set; } // e.g. "Transport, Food, Uniform, Shoe"


        [Required]
        public List<int> TradeIds { get; set; } = new();
    }
}
