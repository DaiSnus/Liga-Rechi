namespace Liga_Rechi.DataLayer.Entities.Files;

public class RewardTemplateFileEntity
{
    public int? Id { get; set; }
    public int? FileId { get; set; }
    public int? RewardId { get; set; }

    public virtual RewardTemplateEntity RewardTemplate { get; set; }
    public virtual FileEntity File { get; set; }
}
