using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Models;

public class DefaultItemDTO
{
    public int Id { get; set; }
    public int ListId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public decimal TargetPrice { get; set; }
    public bool Notify { get; set;}
    public string Image { get; set; }
}