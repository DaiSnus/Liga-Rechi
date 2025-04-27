using Liga_Rechi.DataLayer.Entities.Files;

namespace Liga_Rechi.DataLayer.Entities;

public class RewardTemplateEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int Weight { get; set; }

    public virtual RewardTemplateFileEntity File { get; set; }
    public virtual ICollection<ProjectRewardTemplateEntity> ProjectRewardTemplates { get; set; }
    public virtual ICollection<RewardIssuanceEntity> RewardIssuances { get; set; }
}
