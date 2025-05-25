using Liga_Rechi.Services.Models.Admin.Pages;
using Liga_Rechi.Services.Models.Files;
using Liga_Rechi.Services.Models.Admin;
using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Services.Models.ViewModels;

public class ShowcaseViewModel
{
    public int Id { get; set; }
    public Showcase Showcase { get; set; }
    
    // Календарь
    public string CalendarSubtitle { get; set; } = "";
    public string CalendarLegend { get; set; } = "";
    public List<CalendarEvent> UpcomingEvents { get; set; } = new();
    public bool HasMoreEvents { get; set; }
}