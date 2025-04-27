namespace Liga_Rechi.Services.Models.Admin;

public class Project
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsActive { get; set; }
    public int? LeaderId { get; set; }
    public string? Url { get; set; }
    public IFormFile Logo { get; set; }
}
