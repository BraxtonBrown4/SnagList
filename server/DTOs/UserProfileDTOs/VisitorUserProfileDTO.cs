using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class VisitorUserProfileDTO: DefaultUserProfileDTO
{
   public List<List> Lists { get; set;  } 
}