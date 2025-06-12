using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class List
{
  public int Id { get; set; }
  [Required]
  public int UserProfileId { get; set; }
  public UserProfile? UserProfile { get; set; }
  [Required]
  public string Name { get; set; }
  public bool IsPublic { get; set; } = false;
  public List<ListTag> ListTags { get; set;  }
}
