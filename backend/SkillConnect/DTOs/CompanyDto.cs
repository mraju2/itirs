using System;

namespace SkillConnect.Dtos
{
    public class CompanyDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string Address { get; set; } = null!;

        public int StateId { get; set; }
        public string StateName { get; set; } = null!;
        public string? StateNameTelugu { get; set; }

        public int DistrictId { get; set; }
        public string DistrictName { get; set; } = null!;
        public string? DistrictNameTelugu { get; set; }

        public string Pincode { get; set; } = null!;

        public string ContactEmail { get; set; } = null!;

        public string PrimaryContactPhone { get; set; } = null!;
        public string? SecondaryContactPhone { get; set; }

        public string WebsiteUrl { get; set; } = null!;

        public string? LocationDetails { get; set; }

        public long CreatedAtUnix { get; set; }
        public long UpdatedAtUnix { get; set; }
    }
}
