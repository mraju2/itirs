using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Models
{
    public class District
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string NameTelugu { get; set; } = null!;

        [Required]
        public int StateId { get; set; }

        public State State { get; set; } = null!;
        public List<Company> Companies { get; set; } = new();
    }
}
