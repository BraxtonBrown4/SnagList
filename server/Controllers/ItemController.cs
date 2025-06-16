using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnagList.Data;
using SnagList.DTOs;
using SnagList.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Security.Cryptography.X509Certificates;
using System.Security.Claims;

namespace SnagList.Controllers;

[ApiController]
[Route("api/Items")]
public class ItemController : ControllerBase
{
    private SnagListDbContext _db;
    private IMapper _mapper;

    public ItemController(SnagListDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult DeleteById(int id)
    {
        Item item = _db.Items.Include(i => i.List).FirstOrDefault(i => i.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        if (profile == null || item.List.UserProfileId != profile.Id)
        {
            return Forbid();
        }

        _db.Items.Remove(item);
        _db.SaveChanges();

        return NoContent();

    }
}