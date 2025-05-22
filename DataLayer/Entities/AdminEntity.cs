namespace Liga_Rechi.DataLayer.Entities;

public class AdminEntity
{
    public int? Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string Salt { get; set; }
    public string City { get; set; } = "";
}
