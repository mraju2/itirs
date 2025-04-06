using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class CompanySummaryDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
