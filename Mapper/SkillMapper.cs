using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class SkillMapper
{
    public static SkillEntity? SkillModelToSkillEntity(Skill skillModel)
    {
        if (skillModel == null)
            return null;

        return new SkillEntity
        {
            Description = skillModel.Description ?? "",
            IsSpecialized = skillModel.IsSpecialized,
            Title = skillModel.Title ?? "",
        };
    }

    public static Skill? SkillEntityToSkillModel(SkillEntity? skillEntity)
    {
        if (skillEntity == null) 
            return null;

        return new Skill
        {
            Id = skillEntity.Id,
            Description = skillEntity.Description ?? "",
            Title = skillEntity.Title ?? "",
            IsSpecialized = skillEntity.IsSpecialized,
        };
    }

    public static SkillEntity? UpdateSkillEntity(SkillEntity? skillEntity, Skill? skillModel)
    {
        if (skillModel == null)
            return null;

        skillEntity.Title = skillModel.Title ?? "";
        skillEntity.Description = skillModel.Description ?? "";
        skillEntity.IsSpecialized = skillModel.IsSpecialized;

        return skillEntity;
    }
}
