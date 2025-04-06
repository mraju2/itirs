using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class DistrictDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? NameTelugu { get; set; }
        public int StateId { get; set; }
    }
}