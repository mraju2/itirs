using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Models
{
    [Table("Users")]
    public class UserModel
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, StringLength(100)]
        public string FirstName { get; set; }

        [Required, StringLength(100)]
        public string LastName { get; set; }

        [Required, StringLength(100)]
        public string FatherName { get; set; }

        [Required]
        public long DateOfBirth { get; set; }

        [Required, StringLength(50)]
        public string Trade { get; set; }

        [StringLength(100)]
        public string? OtherTrade { get; set; }

        [Required, StringLength(100)]
        public string Address { get; set; }

        [Required, StringLength(50)]
        public string Mandal { get; set; }

        [Required, StringLength(50)]
        public string District { get; set; }

        [Required, Range(1950, 2025)]
        public int PassYear { get; set; }

        [Required, Range(0, 100)]
        public decimal Percentage { get; set; }

        [StringLength(500)]
        public string? Experience { get; set; }

        [Required]
        public decimal SalaryExpectation { get; set; }

        [Required, StringLength(50)]
        public string WorkLocation { get; set; }

        [Required, RegularExpression(@"^[6-9]\d{9}$")]
        public string PhoneNumber { get; set; }

        [Required, EmailAddress, StringLength(100)]
        public string Email { get; set; }

        [Required, StringLength(100)]
        public string ITIName { get; set; }

        [Required, StringLength(100)]
        public string About { get; set; }

        public long RegistrationDate { get; set; }

        // ✅ Navigation properties for relationships

        // If the user is a recruiter/admin posting jobs
        public List<JobPost> PostedJobs { get; set; } = new();

        // If the user is a candidate applying to jobs
        public List<JobApplication> Applications { get; set; } = new();
    }
}
