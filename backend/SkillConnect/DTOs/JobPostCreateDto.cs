using System;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class JobPostCreateDto
    {
        public Guid CompanyId { get; set; }

        public int StateId { get; set; }
        public int DistrictId { get; set; }
        

        public string JobTitle { get; set; } = null!;
        public string JobLocation { get; set; } = null!;
        public string JobDescription { get; set; } = null!;
        public string EmploymentType { get; set; } = null!;
        public string ApplicationProcess { get; set; } = null!;
        public long ApplicationDeadlineUnix { get; set; }
        public string? AdditionalBenefits { get; set; }
        public string GenderRequirement { get; set; } = null!;
        public int MinAge { get; set; }
        public int? MaxAge { get; set; }
        public decimal SalaryMin { get; set; }
        public decimal SalaryMax { get; set; }
        public bool AccommodationProvided { get; set; }
        public int WorkingHoursMin { get; set; }
        public int WorkingHoursMax { get; set; }
        public int ExperienceMin { get; set; }
        public int? ExperienceMax { get; set; }
        public bool ApprenticesConsidered { get; set; }
        public bool Urgent { get; set; }

        public List<int> TradeIds { get; set; } = new();
    }
}
