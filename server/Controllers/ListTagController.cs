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
[Route("api/ListTags")]
public class ListTagController : ControllerBase
{
    private SnagListDbContext _db;
    private IMapper _mapper;

    public ListTagController(SnagListDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpPost]
    [Authorize]
    public IActionResult PostListTag(ListTagCreateDTO newListTagDTO)
    {
        ListTag newListTag = _mapper.Map<ListTag>(newListTagDTO);
        _db.ListTags.Add(newListTag);
        _db.SaveChanges();

        DefaultListTagDTO resultDto = _mapper.Map<DefaultListTagDTO>(newListTag);

        return Created($"api/ListTags/{newListTag.Id}", resultDto);
    }
}