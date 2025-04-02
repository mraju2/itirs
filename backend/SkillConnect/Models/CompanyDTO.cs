public class CompanyDto
{
    public string? Id { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string District { get; set; } = null!;

    public string State { get; set; } = "Andhra Pradesh"; // Default value

    public string Pincode { get; set; } = null!;

    public string Country { get; set; } = "India"; // Can default as needed

    public string ContactEmail { get; set; } = null!;

    public string ContactPhone { get; set; } = null!;

    public string? WebsiteUrl { get; set; } // Optional
}
