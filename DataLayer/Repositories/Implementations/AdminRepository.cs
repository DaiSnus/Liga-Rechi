using Liga_Rechi.DataLayer.Repositories.Abstractions;
using Liga_Rechi.Mapper;
using Liga_Rechi.Services.Models.Roles;
using Microsoft.EntityFrameworkCore;

namespace Liga_Rechi.DataLayer.Repositories.Implementations;

public class AdminRepository : IAdminRepository
{
    private readonly LigaAppDbContext context;

    public AdminRepository(LigaAppDbContext context)
    {
        this.context = context;
    }

    public async Task<int?> Create(Admin admin)
    {
        var adminEntity = AdminMapper.AdminModelToAdminEntity(admin);

        await context.Admins.AddAsync(adminEntity);
        await context.SaveChangesAsync();
        
        return adminEntity.Id;
    }

    public async Task<int?> Delete(int? id)
    {
        var adminEntity = await context.Admins.FindAsync(id);

        context.Admins.Remove(adminEntity!);
        await context.SaveChangesAsync();

        return adminEntity!.Id;
    }

    public async Task<Admin?> GetAdminByEmail(string email)
    {
        return AdminMapper.AdminEntityToAdminModel(
            await context.Admins.FirstOrDefaultAsync(a => a.Email == email)
            );
    }

    public async Task<Admin?> GetAdminById(int? id)
    {
        return AdminMapper.AdminEntityToAdminModel(await context.Admins.FindAsync(id));
    }

    public async Task<IEnumerable<Admin?>> GetAdmins()
    {
        var admins = await context.Admins
                            .AsNoTracking()
                            .ToListAsync();

        return admins.Select(AdminMapper.AdminEntityToAdminModel);
    }

    public async Task<int?> Update(Admin admin)
    {
        var adminEntity = await context.Admins.FindAsync(admin.Id);
        AdminMapper.UpdateAdminEntity(adminEntity!, admin);
        await context.SaveChangesAsync();

        return adminEntity.Id;
    }
}
