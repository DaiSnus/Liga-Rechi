using Liga_Rechi.DataLayer.Entities.Files;
using Liga_Rechi.Services.Models.Admin;

namespace Liga_Rechi.Mapper;

public static class FileMapper
{
    public static FileModel? FileEntityToFileModel(FileEntity? fileEntity)
    {
        if (fileEntity == null)
            return null;
        return new FileModel
        {
            Id = fileEntity.Id,
            FileName = fileEntity.FileName ?? "",
            FileSize = fileEntity.FileSize,
            FileType = fileEntity.FileType ?? "",
            FileUrl = fileEntity.FileUrl ?? "",
            OwnerId = fileEntity.OwnerId,
        };
    }

    public static FileEntity? FileModelToFileEntity(FileModel? fileModel)
    {
        if (fileModel == null) 
            return null;
        return new FileEntity
        {
            FileName = fileModel.FileName ?? "",
            FileSize = fileModel.FileSize,
            FileType = fileModel.FileType ?? "",
            FileUrl = fileModel.FileUrl ?? "",
            OwnerId = fileModel.OwnerId,
        };
    }

    public static FileEntity? UpdateFileEntity(FileEntity? fileEntity, FileModel? fileModel)
    {
        if (fileModel == null)
            return null;
        fileEntity.FileUrl = fileModel.FileUrl ?? "";
        fileEntity.OwnerId = fileModel.OwnerId;
        fileEntity.FileSize = fileModel.FileSize;
        fileEntity.FileType = fileModel.FileType ?? "";
        fileEntity.FileName = fileModel.FileName ?? "";

        return fileEntity;
    }
}
