using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Pincode { get; set; } = null!;
        public string ContactEmail { get; set; } = null!;
        public string ContactPhone { get; set; } = null!;
        public string WebsiteUrl { get; set; } = null!;
        public string Country { get; set; } = null!;
        public long CreatedAtUnix { get; set; }

        public int StateId { get; set; }
        public string StateName { get; set; } = null!;
        public string? StateNameTelugu { get; set; }

        public int DistrictId { get; set; }
        public string DistrictName { get; set; } = null!;
        public string? DistrictNameTelugu { get; set; }
    }
}
