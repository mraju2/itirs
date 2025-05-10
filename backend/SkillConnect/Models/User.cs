using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(100)]
        public string FirstName { get; set; }

        [Required, StringLength(100)]
        public string LastName { get; set; }

        [Required, StringLength(100)]
        public string FatherName { get; set; }

        [Required]
        public long DateOfBirth { get; set; }

        [Required]
        public int TradeId { get; set; }

        [StringLength(100)]
        public string? OtherTrade { get; set; }

        [Required, StringLength(100)]
        public string Address { get; set; }

        [Required]
        public int DistrictId { get; set; }

        [Required]
        public int StateId { get; set; }

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

        // Navigation properties
        [ForeignKey("TradeId")]
        public Trade Trade { get; set; }

        [ForeignKey("StateId")]
        public State State { get; set; }

        [ForeignKey("DistrictId")]
        public District District { get; set; }

        public List<JobPost> PostedJobs { get; set; } = new();
        public List<JobApplication> JobApplications { get; set; } = new();
    }

}
