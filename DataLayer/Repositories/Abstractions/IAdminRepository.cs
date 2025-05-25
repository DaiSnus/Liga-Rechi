using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.DataLayer.Repositories.Abstractions;

public interface IAdminRepository
{
    Task<IEnumerable<Admin?>> GetAdmins();
    Task<Admin?> GetAdminById(int? id);
    Task<int?> Update(Admin admin);
    Task<int?> Create(Admin admin);
    Task<int?> Delete(int? id);
    Task<Admin?> GetAdminByEmail(string email);
}
