public class JobPostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    public decimal? SalaryFrom { get; set; }
    public decimal? SalaryTo { get; set; }
    public bool IsUrgent { get; set; }
    public DateTime? ApplicationDeadline { get; set; }

    public int CompanyId { get; set; }
    public Guid RecruiterId { get; set; }
}
