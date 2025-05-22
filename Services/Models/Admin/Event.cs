namespace Liga_Rechi.Services.Models.Admin;

public class Event
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public DateTime Date { get; set; }
    public int? ProjectId { get; set; }
}