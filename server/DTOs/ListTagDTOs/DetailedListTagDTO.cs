using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SnagList.Models;

namespace SnagList.DTOs;

public class DetailedListTagDTO : DefaultListTagDTO
{
    public DefaultListDTO List { get; set; }
    public DefaultTagDTO Tag { get; set; }
}