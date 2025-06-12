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

namespace SnagList.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class ListController : ControllerBase
{
    private SnagListDbContext _db;
    private IMapper _mapper;

    public ListController(SnagListDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }


    [HttpGet("public")]
    public IActionResult Get()
    {
        IQueryable query = _db.Lists
        .Include(l => l.ListTags).ThenInclude(l => l.Tag)
        .Include(l => l.UserProfile)
        .Where(l => l.IsPublic);

        List<DefaultListDTO> publicLists = query.ProjectTo<DefaultListDTO>(_mapper.ConfigurationProvider).ToList();

        return Ok(publicLists);
    }
}