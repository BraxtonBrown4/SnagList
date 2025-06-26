using System.Security.Claims;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnagList.Data;
using SnagList.DTOs;
using SnagList.Models;

namespace SnagList.Controllers;

[ApiController]
[Route("api/Notifications/CurrentUser")]
public class NotificationController : ControllerBase
{
    private readonly SnagListDbContext _db;
    private readonly IMapper _mapper;
    private readonly EbayServices _EbayServices;

    public NotificationController(SnagListDbContext db, IMapper mapper, EbayServices EbayServices)
    {
        _db = db;
        _mapper = mapper;
        _EbayServices = EbayServices;
    }

    [HttpGet("ManualSync")]
    [Authorize]
    public async Task<IActionResult> ManualSyncNotifications()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        List<Item> items = _db.Items.Include(i => i.List).Where(i => i.TargetPrice != null && i.Notify && i.List.UserProfileId == profile.Id).ToList();

        if (items.Count == 0)
        {
            return Ok("Exited early, no valid items to search.");
        }

        Result<string> AuthTokenResult = await _EbayServices.GetAuthTokenAsync();

        if (AuthTokenResult.IsFailed)
        {
            return StatusCode(500, $"AuthToken failed to generate. Error: {AuthTokenResult.Errors.First().Message}");
        }

        List<Notification> ebayNotifications = new List<Notification>();

        foreach (Item item in items)
        {
            await Task.Delay(2000);

            Result<EbaySearchResponse> ebayItemsResult = await _EbayServices.FetchItemsByName(item.Name, item.TargetPrice ?? 100M, AuthTokenResult.Value);

            if (ebayItemsResult.IsFailed)
            {
                return StatusCode(500, $"Item failed to fetch. Error: {ebayItemsResult.Errors.First().Message}");
            }

            foreach (EbayItem ebayItem in ebayItemsResult.Value.ItemSummaries)
            {
                Notification notification = _mapper.Map<Notification>(ebayItem);
                notification.UserProfileId = profile.Id;
                decimal bufferPrice = item.TargetPrice * 1.10M ?? 100M;

                if (bufferPrice > decimal.Parse(notification.Price)) {
                    ebayNotifications.Add(notification);
                }
            }
        }

        if (ebayNotifications.Count == 0)
        {
            return Ok("No Notifications");
        }

        _db.Notifications.AddRange(ebayNotifications);
        _db.SaveChanges();

        List<DefaultNotificationDTO> ebayNotifDTOs = _mapper.Map<List<DefaultNotificationDTO>>(ebayNotifications);

        return Ok(ebayNotifDTOs);
    }

    [HttpGet]
    [Authorize]

    public IActionResult GetAllNotifications()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        if (profile == null)
        {
            return Unauthorized();
        }

        List<Notification> notifications = _db.Notifications
            .Where(n => n.UserProfileId == profile.Id)
            .OrderByDescending(n => n.NotificationDate)
            .ToList();

        List<DefaultNotificationDTO> notificationDTOs = _mapper.Map<List<DefaultNotificationDTO>>(notifications);

        return Ok(notificationDTOs);
    }

    [HttpDelete]
    [Authorize]

    public IActionResult DeleteAllNotifications()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        if (profile == null)
        {
            return Unauthorized();
        }

        List<Notification> notifications = _db.Notifications
            .Where(n => n.UserProfileId == profile.Id)
            .ToList();

        _db.Notifications.RemoveRange(notifications);
        _db.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult DeleteOneNotification(int id)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _db.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);

        if (profile == null)
        {
            return Unauthorized();
        }

        Notification notification = _db.Notifications.FirstOrDefault(n => n.Id == id && n.UserProfileId == profile.Id);

        if (notification == null)
        {
            return NotFound();
        }

        _db.Notifications.Remove(notification);
        _db.SaveChanges();

        return NoContent();
    }
}

