using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.DataLayer.Repositories.Abstractions;

public interface IUserRepository
{
    Task<IEnumerable<UserEntity>> GetUsers();
    Task<UserEntity> GetUserById(int id);
    Task<int> Update(int id);
    Task<int> Create(User user);
}
