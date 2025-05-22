namespace Liga_Rechi.DataLayer.Entities.Files;

public class UserFileEntity
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? FileId { get; set; }

    public virtual UserEntity User { get; set; }
    public virtual FileEntity File { get; set; }
}
