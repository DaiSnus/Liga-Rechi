using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Services.Models.Admin.Pages;

public class CalendarEvent
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public DateTime Date { get; set; }
    public decimal Price { get; set; }
    public bool IsFree { get; set; }
    public bool IsProjectEvent { get; set; }
    
    // Для проектов
    public Project? Project { get; set; }
    
    // Для сообществ
    public Community? Community { get; set; }
    
    // Общие поля
    public List<User> Organizers { get; set; } = new(); // Пользователи с ролью важности = 3
    public List<User> Trainers { get; set; } = new(); // Пользователи с ролью важности = 4
    public int ParticipantsCount { get; set; }
    public string? EventUrl { get; set; } // URL мероприятия или проекта
}