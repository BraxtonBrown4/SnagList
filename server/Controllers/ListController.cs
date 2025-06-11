using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SnagList.Data;
using SnagList.DTOs;
using SnagList.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using AutoMapper.QueryableExtensions;

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
        List<DefaultListDTO> results = _db.Lists.ProjectTo<DefaultListDTO>(_mapper.ConfigurationProvider).ToList();
        return Ok(results);
    }
}