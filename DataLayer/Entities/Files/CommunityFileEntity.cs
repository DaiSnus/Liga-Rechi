namespace Liga_Rechi.DataLayer.Entities.Files;

public class CommunityFileEntity
{
    public int? Id { get; set; }
    public int? CommunityId { get; set; }
    public int? FileId { get; set; }

    public virtual FileEntity File { get; set; }
    public virtual CommunityEntity Community { get; set; }
}
