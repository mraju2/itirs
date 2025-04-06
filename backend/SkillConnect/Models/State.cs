using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Models
{
    public class State
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string NameTelugu { get; set; }

        public List<District> Districts { get; set; } = new();
        public List<Company> Companies { get; set; } = new();
    }
}
