namespace Liga_Rechi.DataLayer.Entities;

public class ProjectTeamEntity
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? ProjectId { get; set; }

    public virtual UserEntity User { get; set; }
    public virtual ProjectEntity Project { get; set; }
}
