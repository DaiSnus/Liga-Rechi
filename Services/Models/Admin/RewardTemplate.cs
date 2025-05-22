namespace Liga_Rechi.Services.Models.Admin;

public class RewardTemplate
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int Weight { get; set; }
    public FileModel Image { get; set; }
}