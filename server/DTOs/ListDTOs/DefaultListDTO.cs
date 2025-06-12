using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class DefaultListDTO
{
  public int Id { get; set; }
  public int UserProfileId { get; set; }
  public DefaultUserProfileDTO? UserProfile { get; set; }
  public string Name { get; set; }
  public bool IsPublic { get; set; }
  public List<DefaultTagDTO> Tags { get; set; }
}
