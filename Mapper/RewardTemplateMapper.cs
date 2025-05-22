using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;
using Minio.DataModel.Notification;

namespace Liga_Rechi.Mapper;

public static class RewardTemplateMapper
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
            Image = FileMapper.FileEntityToFileModel(rewardEntity.File.File)!,
            Weight = rewardEntity.Weight,
        };
    }

    public static RewardTemplateEntity? RewardModelToRewardEntity(RewardTemplate? rewardTemplateModel)
    {
        if (rewardTemplateModel == null)
            return null;

        var entity = new RewardTemplateEntity
        {
            Title = rewardTemplateModel.Title ?? "",
            Description = rewardTemplateModel.Description ?? "",
            Weight = rewardTemplateModel.Weight,
        };

        entity.File = FileMapper.FileEntityToRewardTemplateFileEntity(FileMapper.FileModelToFileEntity(rewardTemplateModel.Image), entity)!;
        return entity;
    }

    public static RewardTemplateEntity? UpdateRewardEntity(RewardTemplateEntity? rewardTemplateEntity, RewardTemplate? rewardTemplateModel)
    {
        if (rewardTemplateModel == null)
            return null;

        rewardTemplateEntity.Title = rewardTemplateModel.Title ?? "";
        rewardTemplateEntity.Weight = rewardTemplateModel.Weight;
        rewardTemplateEntity.Description = rewardTemplateModel.Description ?? "";
        rewardTemplateEntity.File = FileMapper.FileEntityToRewardTemplateFileEntity(FileMapper.FileModelToFileEntity(rewardTemplateModel.Image), rewardTemplateEntity)!;
        
        return rewardTemplateEntity;
    }
}