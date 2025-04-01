using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Enum
{

    public enum SalaryType
    {
        Fixed,
        Range
    }

    public enum GenderRequirement
    {
        Male,
        Female,
        Any
    }

    public enum VisibilityType
    {
        Public,
        Unlisted
    }

    public enum JobStatus
    {
        Open,
        Closed,
        Archived
    }

    public enum ApplicationStatus
    {
        Applied,
        UnderReview,
        Shortlisted,
        InterviewScheduled,
        Rejected
    }
}
