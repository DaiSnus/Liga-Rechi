using System.ComponentModel.DataAnnotations;
using Liga_Rechi.DataLayer.Entities.Blocks;
using Liga_Rechi.DataLayer.Entities.Files;

namespace Liga_Rechi.DataLayer.Entities.Pages;

public class ShowcaseEntity
{
    public int? Id { get; set; }
    
    // Баннер
    public int? BannerFileId { get; set; }
    public FileEntity? BannerFile { get; set; }
    public string PhoneNumber { get; set; } = "";
    public string SocialLinks { get; set; } = ""; // JSON строка с ссылками на соцсети
    
    // Календарь
    public string CalendarSubtitle { get; set; } = "";
    public string CalendarLegend { get; set; } = "";
    
    // О нас
    public bool IsAboutUsEnabled { get; set; }
    public string AboutUsTitle1 { get; set; } = "";
    public string AboutUsText1 { get; set; } = "";
    public string AboutUsTitle2 { get; set; } = "";
    public string AboutUsText2 { get; set; } = "";
    public string AboutUsTitle3 { get; set; } = "";
    public string AboutUsText3 { get; set; } = "";
    
    // Клубы-резиденты
    public bool IsResidentClubsEnabled { get; set; }
    public string ResidentClubsSubtitle { get; set; } = "";
    
    // Партнеры
    public bool IsPartnersEnabled { get; set; }
    
    // Будем партнерами
    public PartnershipBlockEntity? PartnershipBlock { get; set; }

    // Город
    public string City { get; set; } = "Екатеринбург";
}