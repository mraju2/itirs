public class JobApplicationDto
{
    public int Id { get; set; }
    public int JobPostId { get; set; }
    public Guid CandidateId { get; set; }
    public string QuestionnaireAnswers { get; set; }
    public bool RequiresAccommodation { get; set; }
    public DateTime AppliedAt { get; set; }
}
