namespace Liga_Rechi.Services.Models.Admin;

public class RewardIssuance
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int Weight { get; set; }
    public int? UserId { get; set; }
    public int? RewardTemplateId { get; set; }
}
