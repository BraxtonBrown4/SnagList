using System.ComponentModel.DataAnnotations;

namespace SnagList.DTOs;

public class DefaultNotificationDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public DateTime NotificationDate { get; } = DateTime.Now;
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