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

    [HttpGet("Public/{id}")]
    public IActionResult GetPublicById(int id)
    {
        List list = _db.Lists
        .Include(l => l.ListTags).ThenInclude(l => l.Tag)
        .Include(l => l.UserProfile)
        .Include(l => l.Items)
        .FirstOrDefault(l => l.IsPublic);

        if (list == null)
        {
            return NotFound();
        }

        DefaultListDTO publicListDTO = _mapper.Map<DefaultListDTO>(list);

        return Ok(publicListDTO);
    }

    [HttpGet("Me")]
    [Authorize]
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

            List<DefaultListDTO> lists = query.ProjectTo<DefaultListDTO>(_mapper.ConfigurationProvider).ToList();

            return Ok(lists);
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

    [HttpGet("Me/{id}")]
    [Authorize]
    public IActionResult GetMyListById(int id)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        List list = _db.Lists
        .Include(l => l.ListTags).ThenInclude(l => l.Tag)
        .Include(l => l.UserProfile)
        .Include(l => l.Items)
        .FirstOrDefault(l => l.Id == id);

        if (profile != null && list.UserProfileId == profile.Id)
        {

            DefaultListDTO listDTO = _mapper.Map<DefaultListDTO>(list);

            return Ok(listDTO);
        }
        return NotFound();
    }

    [HttpPost]
    [Authorize]

    public IActionResult Post(ListCreateDTO newListDTO)
    {
        List newList = _mapper.Map<List>(newListDTO);

        _db.Lists.Add(newList);
        _db.SaveChanges();

        DefaultListDTO createdListDTO = _mapper.Map<DefaultListDTO>(newList);
        return Created($"api/Lists/{newList.Id}", createdListDTO);
    }

    [HttpPut("{id}")]
    [Authorize]

    public IActionResult Put(int id, DefaultListDTO newListDTO)
    {
        List list = _db.Lists.Include(l => l.ListTags).Include(l => l.Items).FirstOrDefault(l => l.Id == id);

        if (list == null)
        {
            return NotFound();
        }

        list.IsPublic = newListDTO.IsPublic;
        list.Name = newListDTO.Name;

        _db.ListTags.RemoveRange(list.ListTags);
        _db.Items.RemoveRange(list.Items);

        _db.SaveChanges();

        newListDTO.Tags.ForEach(t =>
        {
            _db.ListTags.Add(new ListTag
            {
                ListId = list.Id,
                TagId = t.Id
            });
        });

        newListDTO.Items.ForEach(i =>
        {
            _db.Items.Add(new Item
            {
                ListId = list.Id,
                Name = i.Name,
                Price = i.Price,
                TargetPrice = i.TargetPrice,
                Image = i.Image
            });
        });

        _db.SaveChanges();
        DefaultListDTO updatedListDTO = _mapper.Map<DefaultListDTO>(list);
        return Ok(updatedListDTO);
    }
}