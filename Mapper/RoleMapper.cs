using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class RoleMapper
{
    public static Role? RoleEntityToRoleModel(RoleEntity? roleEntity)
    {
        if (roleEntity == null)
            return null;
        return new Role
        {
            Id = roleEntity.Id,
            Title = roleEntity.Title,
            Description = roleEntity.Description,
            Importance = roleEntity.Importance,
        };
    }

    public static RoleEntity? RoleModelToRoleEntity(Role? roleModel)
    {
        if (roleModel == null) 
            return null;
        return new RoleEntity
        {
            Title = roleModel.Title ?? "",
            Description = roleModel.Description ?? "",
            Importance = roleModel.Importance,
        };
    }

    public static RoleEntity? UpdateRoleEntity(RoleEntity? roleEntity, Role? roleModel)
    {
        if (roleModel == null) 
            return null;

        roleEntity.Description = roleModel.Description ?? "";
        roleEntity.Importance = roleModel.Importance;
        roleEntity.Title = roleModel.Title ?? "";

        return roleEntity;
    }
}
