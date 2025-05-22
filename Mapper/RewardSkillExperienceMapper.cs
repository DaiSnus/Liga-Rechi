using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class RewardSkillExperienceMapper
{ 
    public static RewardSkillExperienceEntity? RewardSkillExperienceModelToEntity(RewardSkillExperience? rewardSkillExperienceModel, RewardIssuance rewardIssuance, Skill skill)
    {
        if (rewardSkillExperienceModel == null)
            return null;

        return new RewardSkillExperienceEntity
        {
            Experience = rewardSkillExperienceModel.Experience,
            RewardIssuanceId = rewardSkillExperienceModel.RewardIssuanceId,
            SkillId = rewardSkillExperienceModel.SkillId,
            RewardIssuance = RewardIssuanceMapper.RewardIssuanceModelToEntity(rewardIssuance),
            Skill = SkillMapper.SkillModelToSkillEntity(skill),
        };
    }

    public static RewardSkillExperience? RewardSkillExperienceEntityToModel(RewardSkillExperienceEntity? rewardSkillExperienceEntity)
    {
        if (rewardSkillExperienceEntity == null)
            return null;

        return new RewardSkillExperience
        {
            Id = rewardSkillExperienceEntity.Id,
            Experience = rewardSkillExperienceEntity.Experience,
            RewardIssuanceId = rewardSkillExperienceEntity.RewardIssuanceId,
            SkillId = rewardSkillExperienceEntity.SkillId,
        };
    }

    public static RewardSkillExperienceEntity? UpdaterewardSkillExperienceEntity(RewardSkillExperienceEntity? rewardSkillExperienceEntity, RewardIssuanceEntity rewardIssuanceEntity,
                                                                                 RewardSkillExperience? rewardSkillExperienceModel, SkillEntity skill)
    {
        if (rewardSkillExperienceModel == null)
            return null;

        rewardSkillExperienceEntity.Experience = rewardSkillExperienceModel.Experience;
        rewardSkillExperienceEntity.RewardIssuanceId = rewardSkillExperienceModel.RewardIssuanceId;
        rewardSkillExperienceEntity.SkillId = rewardSkillExperienceModel.SkillId;
        rewardSkillExperienceEntity.Skill = skill;
        rewardSkillExperienceEntity.RewardIssuance = rewardIssuanceEntity;

        return rewardSkillExperienceEntity;
    }
}