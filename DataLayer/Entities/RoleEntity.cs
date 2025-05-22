namespace Liga_Rechi.DataLayer.Entities;

public class RoleEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int Importance { get; set; }

    public ICollection<EventParticipantEntity> Participants { get; set; }
}