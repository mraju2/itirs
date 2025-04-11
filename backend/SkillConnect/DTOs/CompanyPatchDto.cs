using System;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class CompanyPatchDto
    {
        public string? Name { get; set; }

        public string? Address { get; set; }

        public int? StateId { get; set; }

        public int? DistrictId { get; set; }

        public string? Pincode { get; set; }

        [EmailAddress]
        public string? ContactEmail { get; set; }

        [Phone]
        public string? PrimaryContactPhone { get; set; }

        [Phone]
        public string? SecondaryContactPhone { get; set; }

        public string? WebsiteUrl { get; set; }

        public string? LocationDetails { get; set; }

        public string? Country { get; set; }
    }
}
