using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillConnect.Dtos
{
    public class DeleteUserDto
    {
        [Required]
        public Guid Id { get; set; }
    }
}
