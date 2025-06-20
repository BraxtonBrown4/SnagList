using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class CreateListTagDTO
{
    public int ListId { get; set; }
    public int TagId { get; set; }
}