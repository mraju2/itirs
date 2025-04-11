using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Models
{
    public class Company
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

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
        [StringLength(100)]
        public string Pincode { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string ContactEmail { get; set; } = null!;

        [Required]
        [Phone]
        public string PrimaryContactPhone { get; set; } = null!;

        [Phone]
        public string? SecondaryContactPhone { get; set; } // optional

        [Required]
        [StringLength(200)]
        public string WebsiteUrl { get; set; } = null!;

        [StringLength(300)]
        public string? LocationDetails { get; set; } // optional landmark or Google Maps link

        public long CreatedAtUnix { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        public long UpdatedAtUnix { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();


        // Navigation
        public State State { get; set; } = null!;
        public District District { get; set; } = null!;
        public List<JobPost> JobPosts { get; set; } = new();
    }
}
