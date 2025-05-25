using Liga_Rechi.DataLayer.Entities.Files;

namespace Liga_Rechi.DataLayer.Entities.Blocks;

public class PartnershipBlockEntity
{
    public int? Id { get; set; }
    public string MainText { get; set; } = "";
    public string Phone { get; set; } = "";
    public FileEntity? Image { get; set; }
    public int? ImageId { get; set; }
    
    // Первый блок
    public string Title1 { get; set; } = "";
    public string Text1 { get; set; } = "";
    
    // Второй блок
    public string Title2 { get; set; } = "";
    public string Text2 { get; set; } = "";
    
    // Третий блок
    public string Title3 { get; set; } = "";
    public string Text3 { get; set; } = "";
    
    // Четвертый блок
    public string Title4 { get; set; } = "";
    public string Text4 { get; set; } = "";
    
}
