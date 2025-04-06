using System.Text.Json.Serialization;

namespace SkillConnect.Dtos
{
    public class UserDto
    {
        public string? Id { get; set; }

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("fatherName")]
        public string FatherName { get; set; }

        [JsonPropertyName("dateOfBirth")]
        public long DateOfBirth { get; set; }

        [JsonPropertyName("tradeId")]
        public int TradeId { get; set; }

        [JsonPropertyName("tradeName")]
        public string? TradeName { get; set; } // For display only

        [JsonPropertyName("otherTrade")]
        public string? OtherTrade { get; set; }

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("mandal")]
        public string Mandal { get; set; }

        [JsonPropertyName("districtId")]
        public int DistrictId { get; set; }

        [JsonPropertyName("districtName")]
        public string? DistrictName { get; set; }

        [JsonPropertyName("stateId")]
        public int StateId { get; set; }

        [JsonPropertyName("stateName")]
        public string? StateName { get; set; }

        [JsonPropertyName("passYear")]
        public int PassYear { get; set; }

        [JsonPropertyName("percentage")]
        public decimal Percentage { get; set; }

        [JsonPropertyName("experience")]
        public string? Experience { get; set; }

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