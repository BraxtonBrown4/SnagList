using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class DefaultListTagDTO
{
    public int Id { get; set; }
    public int ListId { get; set; }
    public int TagId { get; set; }
}