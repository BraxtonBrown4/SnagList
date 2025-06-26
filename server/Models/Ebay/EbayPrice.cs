using System.Text.Json.Serialization;

namespace SnagList.Models;

public class EbayPrice
{
    public string Value { get; set; }

    [JsonPropertyName("currency")]
    public string CurrencyCode { get; set; }
}
