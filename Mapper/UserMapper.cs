using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Mapper;

public static class UserMapper
{
    public static User? UserEntityToUserModel(UserEntity? userEntity)
    {
        if (userEntity == null)
            return null;
        return new User
        {
            Id = userEntity.Id,
            Email = userEntity.Email ?? "",
            Password = userEntity.Password ?? "",
            Number = userEntity.Number ?? "",
            FirstName = userEntity.FirstName ?? "",
            LastName = userEntity.LastName ?? "",
            Salt = userEntity.Salt ?? "",
            CreationDate = userEntity.CreationDate,
        };
    }

    public static UserEntity? UserModelToUserEntity(User? userModel)
    {
        if (userModel == null)
            return null;
        return new UserEntity
        {
            Email = userModel.Email ?? "",
            Password = userModel.Password ?? "",
            Number = userModel.Number ?? "",
            FirstName = userModel.FirstName ?? "",
            LastName = userModel.LastName ?? "",
            Salt = userModel.Salt ?? "",
            IsActive = userModel.IsActive,
            Status = userModel.Status ?? "",
            Level = userModel.Level,
        };
    }

    public static UserEntity? UpdateUserEntity(User? userModel, UserEntity? userEntity)
    {
        if (userModel == null)
            return null;
        userEntity.Email = userModel.Email ?? "";
        userEntity.Status = userModel.Status ?? "";
        userEntity.Salt = userModel.Salt ?? "";
        userEntity.Password = userModel.Password ?? "";
        userEntity.Level = userModel.Level;
        userEntity.IsActive = userModel.IsActive;
        userEntity.CreationDate = userModel.CreationDate;
        userEntity.FirstName = userModel.FirstName ?? "";
        userEntity.LastName = userModel.LastName ?? "";
        userEntity.Number = userModel.Number ?? "";

        return userEntity;
    }
}