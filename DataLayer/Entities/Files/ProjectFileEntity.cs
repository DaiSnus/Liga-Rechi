namespace Liga_Rechi.DataLayer.Entities.Files;

public class ProjectFileEntity
{
    public int? Id { get; set; }
    public int? ProjectId { get; set; }
    public int? FileId { get; set; }

    public virtual FileEntity File { get; set; }
    public virtual ProjectEntity Project { get; set; }
}
