namespace Liga_Rechi.Services.Models.Roles;

public class Admin : IUser
{
    public int? Id { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string Salt { get; set; }
    public required bool IsAdmin { get; set; }
    public string UniqueId => Id.ToString()!;
}
