namespace SnagList.Models;

public class EbayItem
{
    public string ItemId { get; set; }
    public string Title { get; set; }
    public List<EbayCategory> Categories { get; set; }
    public EbayImage Image { get; set; }
    public EbayPrice Price { get; set; }
    public string ItemWebUrl { get; set; }
    public string Condition { get; set; }
}
