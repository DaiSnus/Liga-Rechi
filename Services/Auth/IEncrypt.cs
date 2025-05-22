namespace Liga_Rechi.Services.Auth;

public interface IEncrypt
{
    string HashPassword(string password, string salt);
}
