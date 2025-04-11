using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SkillConnect.Dtos
{
    public class CompanyUpdateDto : CompanyCreateDto
    {
        [Required]
        public Guid Id { get; set; }
    }
}