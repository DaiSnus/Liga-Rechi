namespace Liga_Rechi.Exceptions;

public class UserNotFoundException : Exception
{
    public UserNotFoundException(string? message = "Пользователь не найден.") : base(message) { }
}
