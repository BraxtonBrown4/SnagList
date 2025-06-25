using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using FluentResults;
using SnagList.Models;

public class EbayServices
{
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _cache;

    public EbayServices(IConfiguration configuration, IMemoryCache cache)
    {
        _configuration = configuration;
        _cache = cache;
    }

    public async Task<Result<string>> GetAuthTokenAsync()
    {
        if (_cache.TryGetValue("EbayToken", out string cachedToken))
        {
            return Result.Ok(cachedToken);
        }

        string clientId = _configuration["Ebay:ClientId"];
        string clientSecret = _configuration["Ebay:ClientSecret"];
        string credentials = $"{clientId}:{clientSecret}";
        string base64Credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));

        using HttpClient client = new HttpClient();

        try
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64Credentials);

            var postData = new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials"),
                new KeyValuePair<string, string>("scope", "https://api.ebay.com/oauth/api_scope")
            };

            var content = new FormUrlEncodedContent(postData);
            HttpResponseMessage tokenResponse = await client.PostAsync("https://api.ebay.com/identity/v1/oauth2/token", content);
            tokenResponse.EnsureSuccessStatusCode();

            string tokenJson = await tokenResponse.Content.ReadAsStringAsync();
            using JsonDocument tokenDoc = JsonDocument.Parse(tokenJson);

            string accessToken = tokenDoc.RootElement.GetProperty("access_token").GetString();
            int expiresIn = tokenDoc.RootElement.GetProperty("expires_in").GetInt32();

            _cache.Set("EbayToken", accessToken, TimeSpan.FromSeconds(expiresIn - 60));

            return Result.Ok(accessToken);
        }
        catch (Exception ex)
        {
            return Result.Fail($"Error retrieving token: {ex.Message}");
        }
    }

    public async Task<Result<EbaySearchResponse>> FetchItemsByName(string name, decimal targetPrice, string accessToken)
    {
        using HttpClient client = new HttpClient();

        decimal bufferPrice = targetPrice * 1.10M;

        string url = $"https://api.ebay.com/buy/browse/v1/item_summary/search?q={Uri.EscapeDataString(name)}&filter=price:[0..{bufferPrice}]&limit=5";

            using var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        try
        {
            HttpResponseMessage searchResponse = await client.SendAsync(request);
            searchResponse.EnsureSuccessStatusCode();

            string searchJson = await searchResponse.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            EbaySearchResponse searchResults = JsonSerializer.Deserialize<EbaySearchResponse>(searchJson, options);

            return Result.Ok(searchResults);
        }
        catch (HttpRequestException ex)
        {
            return Result.Fail($"Error retrieving items: {ex.Message}");
        }
    }
}