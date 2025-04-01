using System.Text.Json.Serialization;

namespace SkillConnect.Models
{
    public class UserDTO
    {
        public string? Id { get; set; }  // ✅ Added Id (nullable for new users)

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("fatherName")]
        public string FatherName { get; set; }

        [JsonPropertyName("dateOfBirth")]
        public long DateOfBirth { get; set; } // Unix Timestamp

        [JsonPropertyName("trade")]
        public string Trade { get; set; }

        [JsonPropertyName("otherTrade")]
        public string? OtherTrade { get; set; } // Optional

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("mandal")]
        public string Mandal { get; set; }

        [JsonPropertyName("district")]
        public string District { get; set; }

        [JsonPropertyName("passYear")]
        public int PassYear { get; set; }

        [JsonPropertyName("percentage")]
        public decimal Percentage { get; set; }

        [JsonPropertyName("experience")]
        public string Experience { get; set; }

        [JsonPropertyName("salaryExpectation")]
        public decimal SalaryExpectation { get; set; }

        [JsonPropertyName("workLocation")]
        public string WorkLocation { get; set; }

        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("itiName")]
        public string ITIName { get; set; }

        [JsonPropertyName("about")]
        public string About { get; set; }
    }
}
