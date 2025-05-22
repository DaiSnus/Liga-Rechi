namespace Liga_Rechi.DataLayer.Entities;

public class SkillEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsSpecialized { get; set; }

    public virtual ICollection<UserSkillEntity> UserSkills { get; set; }
    public virtual ICollection<RewardSkillExperienceEntity> RewardSkillExperiences { get; set; }
}
