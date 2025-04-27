namespace Liga_Rechi.Services.Models.Admin;

public class Community
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Type { get; set; } = "";
    public int? TutorId { get; set; }
    public string? Url { get; set; }
    public IFormFile Logo { get; set; }
}
