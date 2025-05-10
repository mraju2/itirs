using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class PatchUserDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FatherName { get; set; }
        public long? DateOfBirth { get; set; }
        public string? Trade { get; set; }
        public string? OtherTrade { get; set; }
        public string? Address { get; set; }
        public string? District { get; set; }
        public int? PassYear { get; set; }
        public decimal? Percentage { get; set; }
        public string? Experience { get; set; }
        public decimal? SalaryExpectation { get; set; }
        public string? WorkLocation { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? ITIName { get; set; }
        public string? About { get; set; }

        public int? Vacancies { get; set; } // Total positions available


        public string? FacilitiesProvided { get; set; } // e.g. "Transport, Food, Uniform, Shoe"

    }
}
