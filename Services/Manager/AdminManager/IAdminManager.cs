using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Services.Manager.AdminManager;

public interface IAdminManager
{
    Task<IEnumerable<Admin?>> GetAdmins();
    Task<Admin?> GetAdminById(int? id);
    Task<int?> Update(Admin admin);
    Task<int?> Create(Admin admin);
    Task<int?> Delete(int? id);
    Task<Admin?> GetAdminByEmail(string email);
    Task<Admin?> ValidateOperatorCredentials(string email, string password);
}
