namespace Liga_Rechi.Services.Models.Files;

public class FileModel
{
    public int? Id { get; set; }
    public string FileName { get; set; } = "";
    public string FileUrl { get; set; } = "";
    public string FileType { get; set; } = "";
    public long FileSize { get; set; }
    public int? OwnerId { get; set; }
}
