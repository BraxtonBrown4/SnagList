using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class DefaultUserProfileDTO
{
    public int Id { get; set; }
    public string? ProfilePic { get; set; }
    public string UserName { get; set; }
    public List<List> Lists { get; set; }
}