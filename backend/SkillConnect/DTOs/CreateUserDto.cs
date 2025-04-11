using System;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Dtos
{
    public class CreateUserDto
    {
        [Required, StringLength(100)]
        public string FirstName { get; set; }

        [Required, StringLength(100)]
        public string LastName { get; set; }

        [Required, StringLength(100)]
        public string FatherName { get; set; }

        [Required]
        public long DateOfBirth { get; set; }

        [Required]
        public int TradeId { get; set; } // ✅ Foreign key to Trade

        [StringLength(100)]
        public string? OtherTrade { get; set; }

        [Required, StringLength(100)]
        public string Address { get; set; }

        [Required, StringLength(50)]
        public string Mandal { get; set; }

        [Required]
        public int StateId { get; set; } // ✅ New FK

        [Required]
        public int DistrictId { get; set; } // ✅ New FK

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
    }
}
