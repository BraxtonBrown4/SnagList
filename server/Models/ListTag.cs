using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class ListTag
{
    public int Id { get; set; }
    [Required]
    public int ListId { get; set; }
    [Required]
    public int TagId { get; set; }
    public List? List { get; set; }
    public Tag? Tag { get; set; }
}