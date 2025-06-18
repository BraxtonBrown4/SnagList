using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class ListCreateDTO
{
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public bool IsPublic { get; set; }
}
