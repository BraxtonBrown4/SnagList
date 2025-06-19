using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnagList.Data;
using SnagList.DTOs;
using SnagList.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using AutoMapper;

namespace SnagList.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private SnagListDbContext _dbContext;
    private IMapper _mapper;

    public UserProfileController(SnagListDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName
            })
            .ToList());
    }
    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            Email = up.IdentityUser.Email,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }
    [HttpPost("promote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Promote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        // This will create a new row in the many-to-many UserRoles table.
        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("demote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Demote(string id)
    {
        IdentityRole role = _dbContext.Roles
            .SingleOrDefault(r => r.Name == "Admin");
        IdentityUserRole<string> userRole = _dbContext
            .UserRoles
            .SingleOrDefault(ur =>
                ur.RoleId == role.Id &&
                ur.UserId == id);

        _dbContext.UserRoles.Remove(userRole);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult getProfileById(int id)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        UserProfile userProfile = _dbContext.UserProfiles.Include(u => u.Lists).Include(u => u.IdentityUser).FirstOrDefault(u => u.Id == id);

        if (userProfile == null)
        {
            return NotFound();
        }

        if (profile.Id == userProfile.Id)
        {
            MyUserProfileDTO DTO = _mapper.Map<MyUserProfileDTO>(userProfile);
            return Ok(DTO);
        }
        else
        {
            userProfile.Lists = userProfile.Lists.Where(l => l.IsPublic).ToList();
            DefaultUserProfileDTO DTO = _mapper.Map<DefaultUserProfileDTO>(userProfile);
            return Ok(DTO);
        }
    }
}