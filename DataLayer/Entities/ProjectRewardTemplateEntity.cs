namespace Liga_Rechi.DataLayer.Entities;

public class ProjectRewardTemplateEntity
{
    public int? Id { get; set; }
    public int? ProjectId { get; set; }
    public int? RewardTemplateId { get; set; }

    public virtual ProjectEntity Project { get; set; }
    public virtual RewardTemplateEntity RewardTemplate { get; set; }
}
