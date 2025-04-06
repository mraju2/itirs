using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class TradeDto
    {
        public int TradeId { get; set; }
        public string TradeName { get; set; } = null!;
        public string? TradeNameTelugu { get; set; }
    }
}