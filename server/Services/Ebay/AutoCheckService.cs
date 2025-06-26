using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SnagList.Data;
using SnagList.Models;

public class AutoCheckService : BackgroundService
{
    private readonly ILogger<AutoCheckService> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public AutoCheckService(ILogger<AutoCheckService> logger, IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.Now;
            var noonToday = DateTime.Today.AddHours(12);

            if (now > noonToday)
                noonToday = noonToday.AddDays(1);

            var delay = noonToday - now;

            _logger.LogInformation($"Waiting {delay.TotalMinutes} minutes until next noon.");

            await Task.Delay(delay, stoppingToken);

            if (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Running scheduled task at noon...");

                    using (var scope = _scopeFactory.CreateScope())
                    {
                        var _db = scope.ServiceProvider.GetRequiredService<SnagListDbContext>();
                        var _EbayServices = scope.ServiceProvider.GetRequiredService<EbayServices>();
                        var _mapper = scope.ServiceProvider.GetRequiredService<IMapper>();

                        List<Item> items = _db.Items
                            .Include(i => i.List)
                            .Where(i => i.TargetPrice != null && i.Notify)
                            .ToList();

                        Result<string> AuthTokenResult = await _EbayServices.GetAuthTokenAsync();

                        if (AuthTokenResult.IsFailed)
                        {
                            throw new Exception($"Failed to get Auth Token from EbayServices. Error: {AuthTokenResult.Errors.First().Message}");
                        }

                        foreach (Item item in items)
                        {
                            await Task.Delay(2000);

                            Result<EbaySearchResponse> ebayItemsResult = await _EbayServices.FetchItemsByName(item.Name, item.TargetPrice ?? 0M, AuthTokenResult.Value);

                            if (ebayItemsResult.IsFailed)
                            {
                                throw new Exception($"Item failed to fetch. Error: {ebayItemsResult.Errors.First().Message}");
                            }

                            foreach (EbayItem ebayItem in ebayItemsResult.Value.ItemSummaries)
                            {
                                Notification notification = _mapper.Map<Notification>(ebayItem);
                                notification.UserProfileId = item.List.UserProfileId;

                                decimal bufferPrice = item.TargetPrice * 1.10M ?? 100M;

                                if (bufferPrice > decimal.Parse(notification.Price))
                                {
                                    _db.Add(notification);
                                }
                            }
                        }

                        _db.SaveChanges();

                        _logger.LogInformation("Logged Notifications");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error: {ex.Message}");
                }
            }

            await Task.Delay(TimeSpan.FromMinutes(10), stoppingToken);
        }
    }
}
