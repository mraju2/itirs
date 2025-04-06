using Microsoft.AspNetCore.Mvc;

public class PaginatedQueryParams
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SearchTerm { get; set; }
    public string? SortBy { get; set; }
    public bool IsDescending { get; set; } = false;

    [FromQuery(Name = "filters")]
    public Dictionary<string, string>? Filters { get; set; }
}
