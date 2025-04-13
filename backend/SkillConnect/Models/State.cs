using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Models
{
    public class State
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string NameTelugu { get; set; }

        public List<District> Districts { get; set; } = new();
        public List<Company> Companies { get; set; } = new();
    }
}
