namespace Liga_Rechi.DataLayer.Entities;

public class EventParticipantEntity
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? EventId { get; set; }
    public int? RoleId { get; set; }

    public virtual UserEntity User { get; set; }
    public virtual EventEntity Event { get; set; }
    public virtual RoleEntity Role { get; set; }
    public virtual ICollection<TrainerVisitsEntity> TrainerVisits { get; set; }
}
