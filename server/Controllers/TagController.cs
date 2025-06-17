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
[Route("api/Tags")]
public class TagController : ControllerBase
{
    private SnagListDbContext _db;
    private IMapper _mapper;

    public TagController(SnagListDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        List<DefaultTagDTO> tags = _db.Tags.ProjectTo<DefaultTagDTO>(_mapper.ConfigurationProvider).ToList();

        return Ok(tags);
    }
}