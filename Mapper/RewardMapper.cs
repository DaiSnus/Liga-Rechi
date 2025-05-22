using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class RewardMapper
{
    public static RewardTemplate? RewardEntityToRewardModel(RewardTemplateEntity? rewardEntity)
    {
        if (rewardEntity == null)
            return null;
        return new RewardTemplate
        {
            Id = rewardEntity.Id,
            Title = rewardEntity.Title ?? "",
            Description = rewardEntity.Description ?? "",
            Image = FileMapper.FileEntityToFileModel(rewardEntity.File.File),
        };
    }

    public static RewardTemplateEntity? RewardModelToRewardEntity(RewardTemplate? rewardModel)
    {
        if (rewardModel == null)
            return null;
        return new RewardTemplateEntity
        {
            
        };
    }
}
