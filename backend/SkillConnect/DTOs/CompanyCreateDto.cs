using System;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class CompanyCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(500)]
        public string Address { get; set; } = null!;

        [Required]
        public int DistrictId { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        [StringLength(10)]
        public string Pincode { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string ContactEmail { get; set; } = null!;

        [Required]
        [Phone]
        public string PrimaryContactPhone { get; set; } = null!;

        [Phone]
        public string? SecondaryContactPhone { get; set; }

        [Required]
        [StringLength(200)]
        public string WebsiteUrl { get; set; } = null!;

        [StringLength(300)]
        public string? LocationDetails { get; set; }
    }
}
