using Liga_Rechi.DataLayer.Entities.Files;

namespace Liga_Rechi.DataLayer.Entities;

public class CommunityEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Type { get; set; } = "";
    public string Url { get; set; } = "";
    public int? TutorId { get; set; }
    
    public virtual UserEntity Tutor { get; set; }
    public virtual ICollection<CommunityFileEntity> Files { get; set; }
    public virtual ICollection<CommunityTeamEntity> Team { get; set; }
    public virtual ICollection<EventEntity> Events { get; set; }
}
