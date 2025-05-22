namespace Liga_Rechi.DataLayer.Entities;

public class RewardSkillExperienceEntity
{
    public int? Id { get; set; }
    public int Experience { get; set; }
    public int? RewardIssuanceId { get; set; }
    public int? SkillId { get; set; }

    public virtual RewardIssuanceEntity RewardIssuance { get; set; }
    public virtual SkillEntity Skill { get; set; }
}
