using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string? ProfilePic { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public string? Address { get; set; }
    public string IdentityUserId { get; set; }
    public IdentityUser IdentityUser { get; set; }
    public List<List> Lists { get; set; }
}
