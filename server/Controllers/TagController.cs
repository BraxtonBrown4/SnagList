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
    public IActionResult GetAllTags()
    {
        List<DefaultTagDTO> tags = _db.Tags.ProjectTo<DefaultTagDTO>(_mapper.ConfigurationProvider).ToList();

        return Ok(tags);
    }

    [HttpPost]
    [Authorize]
    public IActionResult PostTag(DefaultTagDTO newTagDTO)
    {
        if (_db.Tags.Any(t => t.Name == newTagDTO.Name))
        {
            return BadRequest();
        }

        Tag newTag = _mapper.Map<Tag>(newTagDTO);

        _db.Tags.Add(newTag);
        _db.SaveChanges();

        DefaultTagDTO createdTagDTO = _mapper.Map<DefaultTagDTO>(newTag);
        return Created($"api/Tags/{newTag.Id}", createdTagDTO);
    }
}