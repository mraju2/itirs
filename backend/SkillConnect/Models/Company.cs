using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public string Country { get; set; }

        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }

        public string WebsiteUrl { get; set; }
        public string LogoUrl { get; set; }

        // Relationships
        public List<JobPost> JobPosts { get; set; } = new();
    }
}
