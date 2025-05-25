using Liga_Rechi.Services.Models.Files;

namespace Liga_Rechi.Services.Models.Admin.Pages;

public class Showcase
{
    public int? Id { get; set; }
    public int? BannerFileId { get; set; }
    public FileModel? BannerFile { get; set; }
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
    public PartnershipBlock? PartnershipBlock { get; set; }

    // Город
    public string City { get; set; } = "Екатеринбург";
}
