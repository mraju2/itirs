using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class CompanyCreateDto
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Address { get; set; } = null!;

        [Required]
        public string City { get; set; } = null!;

        [Required]
        public int DistrictId { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        public string Pincode { get; set; } = null!;

        [Required, EmailAddress]
        public string ContactEmail { get; set; } = null!;

        [Required, Phone]
        public string ContactPhone { get; set; } = null!;

        [Required]
        public string WebsiteUrl { get; set; } = null!;

        public string Country { get; set; } = "India";
    }
}
