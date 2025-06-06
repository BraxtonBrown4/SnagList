using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class Item
{
    public int Id { get; set; }
    [Required]
    public int ListId { get; set; }
    public List? List { get; set; }
    [Required]
    public string Name { get; set; }
    public decimal? Price { get; set; }
    public decimal? TargetPrice { get; set; }
    public string? Image { get; set; }
}