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
[Route("api/Lists")]
public class ListController : ControllerBase
{
    private SnagListDbContext _db;
    private IMapper _mapper;

    public ListController(SnagListDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }


    [HttpGet("Public")]
    public IActionResult GetAllPublic()
    {
        IQueryable query = _db.Lists
        .Include(l => l.ListTags).ThenInclude(l => l.Tag)
        .Include(l => l.UserProfile)
        .Include(l => l.Items)
        .Where(l => l.IsPublic);

        List<DefaultListDTO> publicLists = query.ProjectTo<DefaultListDTO>(_mapper.ConfigurationProvider).ToList();

        return Ok(publicLists);
    }

    [HttpGet("{id}")]
    public IActionResult GetPublicById(int id)
    {
        IQueryable query = _db.Lists
        .Include(l => l.ListTags).ThenInclude(l => l.Tag)
        .Include(l => l.UserProfile)
        .Include(l => l.Items)
        .Where(l => l.UserProfileId == id && l.IsPublic);

        List<DefaultListDTO> publicLists = query.ProjectTo<DefaultListDTO>(_mapper.ConfigurationProvider).ToList();

        return Ok(publicLists);
    }

    [HttpGet("Me")]
    public IActionResult GetMyLists()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
        if (profile != null)
        {
            IQueryable query = _db.Lists
        .Include(l => l.ListTags).ThenInclude(l => l.Tag)
        .Include(l => l.UserProfile)
        .Include(l => l.Items)
        .Where(l => l.UserProfileId == profile.Id);

            List<DefaultListDTO> publicLists = query.ProjectTo<DefaultListDTO>(_mapper.ConfigurationProvider).ToList();

            return Ok(publicLists);
        }
        return NotFound();
    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult Delete(int id)
    {
        var list = _db.Lists.FirstOrDefault(l => l.Id == id);
        if (list == null)
        {
            return NotFound();
        }

        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        if (profile == null || list.UserProfileId != profile.Id)
        {
            return Forbid();
        }

        _db.Lists.Remove(list);
        _db.SaveChanges();

        return NoContent();
    }
}