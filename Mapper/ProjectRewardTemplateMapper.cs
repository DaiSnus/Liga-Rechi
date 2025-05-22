using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class ProjectRewardTemplateMapper
{
    public static ProjectRewardTemplateEntity? ProjectRewardTemplateModelToEntity(ProjectRewardTemplate? projectRewardTemplateModel)
    {
        if (projectRewardTemplateModel == null)
            return null;

        return new ProjectRewardTemplateEntity
        {
            ProjectId = projectRewardTemplateModel.ProjectId,
            RewardTemplateId = projectRewardTemplateModel.RewardTemplateId,
        };
    }

    public static ProjectRewardTemplate? ProjectRewardEntityToModel(ProjectRewardTemplateEntity? projectRewardTemplateEntity)
    {
        if (projectRewardTemplateEntity == null) 
            return null;

        return new ProjectRewardTemplate
        {
            Id = projectRewardTemplateEntity.Id,
            ProjectId = projectRewardTemplateEntity.ProjectId,
            RewardTemplateId = projectRewardTemplateEntity.RewardTemplateId,
        };
    }

    public static ProjectRewardTemplateEntity? UpdateProjectRewardTemplateEntity(ProjectRewardTemplateEntity? projectRewardTemplateEntity,
                                                                                    ProjectRewardTemplate? projectRewardTemplateModel)
    {
        if (projectRewardTemplateModel == null)
            return null;

        projectRewardTemplateEntity.RewardTemplateId = projectRewardTemplateModel.RewardTemplateId;
        projectRewardTemplateEntity.ProjectId = projectRewardTemplateModel.ProjectId;

        return projectRewardTemplateEntity;
    }
}
