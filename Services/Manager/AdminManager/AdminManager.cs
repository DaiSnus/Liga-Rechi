using Liga_Rechi.DataLayer.Repositories.Abstractions;
using Liga_Rechi.Exceptions;
using Liga_Rechi.Services.Auth;
using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Services.Manager.AdminManager;

public class AdminManager : IAdminManager
{
    private readonly IAdminRepository adminRepository;
    private readonly IEncrypt encrypt;
    
    public AdminManager(IAdminRepository adminRepository, IEncrypt encrypt)
    {
        this.adminRepository = adminRepository;
        this.encrypt = encrypt;
    }

    public async Task<int?> Create(Admin admin)
    {
        var existingAdmin = await adminRepository.GetAdminByEmail(admin.Email);
        if (existingAdmin != null)
            throw new UserNotFoundException("Такая почта уже существует");
        admin.Salt = Guid.NewGuid().ToString();
        admin.Password = encrypt.HashPassword(admin.Password, admin.Salt);
        return await adminRepository.Create(admin);
    }

    public async Task<int?> Delete(int? id)
    {
        return await adminRepository.Delete(id) ?? throw new UserNotFoundException();
    }

    public async Task<Admin?> GetAdminByEmail(string email)
    {
        return await adminRepository.GetAdminByEmail(email) ?? throw new UserNotFoundException();
    }

    public async Task<Admin?> GetAdminById(int? id)
    {
        return await adminRepository.GetAdminById(id) ?? throw new UserNotFoundException();
    }

    public async Task<IEnumerable<Admin?>> GetAdmins()
    {
        return await adminRepository.GetAdmins() ?? Enumerable.Empty<Admin>();
    }

    public async Task<int?> Update(Admin admin)
    {
        return await adminRepository.Update(admin) ?? throw new UserNotFoundException();
    }

    public async Task<Admin?> ValidateOperatorCredentials(string email, string password)
    {
        var admin = await adminRepository.GetAdminByEmail(email);
        if (admin == null)
            throw new UserNotFoundException("Email не найден");

        var hashedPassword = encrypt.HashPassword(password, admin.Salt);
        if (admin.Password != hashedPassword)
            return null;
            
        return admin;
    }
}
