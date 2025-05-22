using Liga_Rechi.DataLayer.Entities.Files;

namespace Liga_Rechi.DataLayer.Entities;

public class ProjectEntity
{
    public int? Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsActive { get; set; } 
    public int? LeaderId { get; set; }
    public string Url { get; set; } = "";

    public virtual UserEntity Leader { get; set; }
    public virtual ICollection<ProjectFileEntity> Files { get; set; }
    public virtual ICollection<ProjectTeamEntity> Team { get; set; }
    public virtual ICollection<EventEntity> Events { get; set; }
    public virtual ICollection<ProjectRewardTemplateEntity> ProjectRewardTemplates { get; set; }
}
