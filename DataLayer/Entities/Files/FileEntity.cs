namespace Liga_Rechi.DataLayer.Entities.Files;

public class FileEntity
{
    public int? Id { get; set; }
    public string FileName { get; set; } = "";
    public string FileUrl { get; set; } = "";
    public string FileType { get; set; } = "";
    public long FileSize { get; set; }
    public int? OwnerId { get; set; }
}
