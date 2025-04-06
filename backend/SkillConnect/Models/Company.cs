using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Models
{
    public class Company
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

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

        [Required]
        public string Country { get; set; } = "India";

        public long CreatedAtUnix { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        // Navigation
        public State State { get; set; } = null!;
        public District District { get; set; } = null!;
        public List<JobPost> JobPosts { get; set; } = new();
    }

}

