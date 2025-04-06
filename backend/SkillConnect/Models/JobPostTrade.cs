
namespace SkillConnect.Models
{
    public class JobPostTrade
    {
        public Guid JobPostId { get; set; }
        public JobPost JobPost { get; set; } = null!;

        public int TradeId { get; set; }
        public Trade Trade { get; set; } = null!;
    }
}
