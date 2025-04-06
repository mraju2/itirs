using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Models
{
    public class Trade
    {
        [Key]
        public int TradeId { get; set; }

        [Required]
        public string TradeName { get; set; } = null!;

        [Required]
        public string TradeNameTelugu { get; set; } = null!;

        public List<JobPostTrade> JobPostTrades { get; set; } = new();
    }
}

