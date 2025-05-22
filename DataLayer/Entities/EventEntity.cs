namespace Liga_Rechi.DataLayer.Entities;

public class EventEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public DateTime Date { get; set; }
    public int? ProjectId { get; set; }
    public int? CommunityId { get; set; }
    public int? PumpingSkillId { get; set; }

    public virtual SkillEntity PumpingSkill { get; set; }
    public virtual ProjectEntity Project { get; set; }
    public virtual CommunityEntity Community { get; set; }
    public virtual ICollection<EventTeamEntity> Managers { get; set; }
    public virtual ICollection<EventParticipantEntity> Participants { get; set; }
    public virtual ICollection<EventTrainerSkillEntity> TrainerSkills { get; set; }
}
