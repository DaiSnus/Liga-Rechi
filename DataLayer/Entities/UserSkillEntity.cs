namespace Liga_Rechi.DataLayer.Entities;

public class UserSkillEntity
{
    public int? Id { get; set; }
    public int TotalExpirience { get; set; }
    public int? UserId { get; set; }
    public int? SkillId { get; set; }

    public virtual UserEntity User { get; set; }
    public virtual SkillEntity Skill { get; set; }
}
