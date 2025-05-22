using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;
using Liga_Rechi.Services.Models.Roles;

namespace Liga_Rechi.Mapper;

public static class UserSkillMapper
{
    public static UserSkillEntity? UserSkillModelToEntity(UserSkill? userSkill, User user, Skill skill)
    {
        if (userSkill == null) 
            return null;

        return new UserSkillEntity
        {
            SkillId = userSkill.SkillId,
            UserId = userSkill.UserId,
            User = UserMapper.UserModelToUserEntity(user),
            Skill = SkillMapper.SkillModelToSkillEntity(skill),
        };
    }

    public static UserSkill? UserSkillEntityToUserModel(UserSkillEntity? userSkillEntity)
    {
        if (userSkillEntity == null)
            return null;

        return new UserSkill
        {
            Id = userSkillEntity.Id,
            UserId = userSkillEntity.UserId,
            SkillId = userSkillEntity.SkillId,
        };
    }
}
