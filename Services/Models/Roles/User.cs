namespace Liga_Rechi.Services.Models.Roles;

public class User : IUser
{
    public int? Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string Salt { get; set; } = "";
    public string Number { get; set; } = "";
    public DateTime CreationDate { get; set; }
    public bool IsActive { get; set; }
    public string Status { get; set; } = "";
    public int Level { get; set; }

    public string UniqueId => Id.ToString()!;
}
