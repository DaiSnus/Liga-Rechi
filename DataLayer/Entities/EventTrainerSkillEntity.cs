namespace Liga_Rechi.DataLayer.Entities;

public class EventTrainerSkillEntity
{
    public int? Id { get; set; }
    public int? EventId { get; set; }
    public int? SkillId { get; set;}
    public int? TrainerId { get; set; }

    public virtual UserEntity Trainer { get; set; }
    public virtual SkillEntity Skill { get; set; }
    public virtual EventEntity Event { get; set; }
}
