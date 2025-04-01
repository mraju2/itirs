using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SkillConnect.Enum;

namespace SkillConnect.Models
{
    public class JobApplication
    {
        public Guid Id { get; set; }

        public Guid JobPostId { get; set; }
        public JobPost JobPost { get; set; }

        public Guid CandidateId { get; set; }
        public UserModel Candidate { get; set; }

        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;
        public long AppliedAt { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        public bool RequiresAccommodation { get; set; }
        public string QuestionnaireAnswers { get; set; }
        public bool IsWithdrawn { get; set; } = false;
    }
}
