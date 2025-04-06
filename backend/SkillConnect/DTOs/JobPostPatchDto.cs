using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class JobPostPatchDto
    {
        public string? JobTitle { get; set; }
        public string? District { get; set; }
        public string? JobDescription { get; set; }
        public string? EmploymentType { get; set; }
        public string? ApplicationProcess { get; set; }
        public long? ApplicationDeadlineUnix { get; set; }
        public string? AdditionalBenefits { get; set; }
        public string? GenderRequirement { get; set; }
        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }
        public decimal? SalaryMin { get; set; }
        public decimal? SalaryMax { get; set; }
        public bool? AccommodationProvided { get; set; }
        public int? WorkingHoursMin { get; set; }
        public int? WorkingHoursMax { get; set; }
        public int? ExperienceMin { get; set; }
        public int? ExperienceMax { get; set; }
        public bool? ApprenticesConsidered { get; set; }
        public bool? Urgent { get; set; }

        public int? Vacancies { get; set; } // Total positions available


        public string? FacilitiesProvided { get; set; } // e.g. "Transport, Food, Uniform, Shoe"

        public List<int>? TradeIds { get; set; }
    }
}
