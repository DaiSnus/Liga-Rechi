using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class RewardIssuanceMapper
{
    public static RewardIssuanceEntity? RewardIssuanceModelToEntity(RewardIssuance? rewardIssuanceModel)
    {
        if (rewardIssuanceModel == null)
            return null;

        return new RewardIssuanceEntity
        {
            Title = rewardIssuanceModel.Title ?? "",
            Description = rewardIssuanceModel.Description ?? "",
            Weight = rewardIssuanceModel.Weight,
            RewardTemplateId = rewardIssuanceModel.RewardTemplateId,
            UserId = rewardIssuanceModel.UserId,
        };
    }

    public static RewardIssuance? RewardIssuanceEntityToModel(RewardIssuanceEntity? rewardIssuanceEntity)
    {
        if (rewardIssuanceEntity == null) 
            return null;

        return new RewardIssuance
        {
            Id = rewardIssuanceEntity.Id,
            Title = rewardIssuanceEntity.Title ?? "",
            Description = rewardIssuanceEntity.Description ?? "",
            Weight = rewardIssuanceEntity.Weight,
            RewardTemplateId = rewardIssuanceEntity.RewardTemplateId,
            UserId = rewardIssuanceEntity.UserId,
        };
    }

    public static RewardIssuanceEntity? UpdateRewardIssuanceEntity(RewardIssuanceEntity? rewardIssuanceEntity,
                                                                    RewardIssuance? rewardIssuanceModel)
    {
        if (rewardIssuanceModel == null) 
            return null;

        rewardIssuanceEntity.Title = rewardIssuanceModel.Title ?? "";
        rewardIssuanceEntity.Description = rewardIssuanceModel.Description ?? "";
        rewardIssuanceEntity.Weight = rewardIssuanceModel.Weight;
        rewardIssuanceEntity.RewardTemplateId = rewardIssuanceModel.RewardTemplateId;
        rewardIssuanceEntity.UserId = rewardIssuanceModel.UserId;

        return rewardIssuanceEntity;
    }
}
