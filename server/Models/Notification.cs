using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class Notification
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public DateTime NotificationDate { get; set; } = DateTime.Now;
    [Required]
    public string Title { get; set; }
    public string? Image { get; set; }
    [Required]
    public string Price { get; set; }
    [Required]
    public string Currency { get; set; }
    [Required]
    public string ItemWebUrl { get; set; }
    [Required]
    public string Condition { get; set; }
}