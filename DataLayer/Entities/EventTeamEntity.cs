namespace Liga_Rechi.DataLayer.Entities;

public class EventTeamEntity
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? EventId { get; set; }

    public virtual UserEntity User { get; set; }
    public virtual EventEntity Event { get; set; }
}
