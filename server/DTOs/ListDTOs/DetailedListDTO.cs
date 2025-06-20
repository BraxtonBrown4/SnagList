using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class DetailedListDTO : DefaultListDTO
{
  public DefaultUserProfileDTO UserProfile { get; set; }
  public List<DefaultTagDTO> Tags { get; set; }
  public List<DefaultItemDTO> Items { get; set; }
}
