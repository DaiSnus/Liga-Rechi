using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Mapper;

public static class AdminMapper
{
    public static AdminEntity? AdminModelToAdminEntity(Admin adminModel)
    {
        if (adminModel == null)
            return null;
        return new AdminEntity
        {
            Email = adminModel.Email ?? "",
            FirstName = adminModel.FirstName ?? "",
            LastName = adminModel.LastName ?? "",
            City = adminModel.City ?? "",
            Password = adminModel.Password ?? "",
            Salt = adminModel.Salt ?? ""
        };
    }

    public static Admin? AdminEntityToUserModel(AdminEntity adminEntity)
    {
        if (adminEntity == null)
            return null;
        return new Admin
        {
            Email = adminEntity.Email ?? "",
            FirstName = adminEntity.FirstName ?? "",
            LastName = adminEntity.LastName ?? "",
            City = adminEntity.City ?? "",
            Password = adminEntity.Password ?? "",
            Salt = adminEntity.Salt ?? "",
        };
    }

    public static AdminEntity? UpdateAdminEntity(AdminEntity adminEntity, Admin adminModel)
    {
        if (adminModel == null)
            return null;

        adminEntity.Salt = adminModel.Salt ?? "";
        adminEntity.City = adminModel.City ?? "";
        adminEntity.Email = adminModel.Email ?? "";
        adminEntity.FirstName = adminModel.FirstName ?? "";
        adminEntity.LastName = adminModel.LastName ?? "";
        adminEntity.Password = adminModel.Password ?? "";

        return adminEntity;
    }
}
