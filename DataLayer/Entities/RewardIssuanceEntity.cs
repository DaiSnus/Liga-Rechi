using Liga_Rechi.DataLayer.Entities.Files;

namespace Liga_Rechi.DataLayer.Entities;

public class RewardIssuanceEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int Weight { get; set; }
    public int? UserId { get; set; }
    public int? RewardTemplateId { get; set; }

    public virtual RewardTemplateEntity RewardTemplate { get; set; }
    public virtual UserEntity User { get; set; }
    public virtual ICollection<RewardSkillExperienceEntity> RewardSkillExperience { get; set; }
}
