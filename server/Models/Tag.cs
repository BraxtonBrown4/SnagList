using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class Tag
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}
