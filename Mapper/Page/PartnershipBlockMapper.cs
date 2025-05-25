using Liga_Rechi.DataLayer.Entities.Blocks;
using Liga_Rechi.Services.Models.Admin.Pages;

namespace Liga_Rechi.Mapper.Page;

public class PartnershipBlockMapper
{
    public static PartnershipBlock PartnershipBlockEntityToModel(PartnershipBlockEntity? partnershipBlockEntity)
    {
        if (partnershipBlockEntity == null)
            return null;
            
        return new PartnershipBlock
        {
            Id = partnershipBlockEntity.Id,
            MainText = partnershipBlockEntity.MainText ?? "",
            Phone = partnershipBlockEntity.Phone ?? "",
            Image = FileMapper.FileEntityToFileModel(partnershipBlockEntity.Image),
            ImageId = partnershipBlockEntity.ImageId,
            Title1 = partnershipBlockEntity.Title1 ?? "",
            Text1 = partnershipBlockEntity.Text1 ?? "",
            Title2 = partnershipBlockEntity.Title2 ?? "",
            Text2 = partnershipBlockEntity.Text2 ?? "",
            Title3 = partnershipBlockEntity.Title3 ?? "",
            Text3 = partnershipBlockEntity.Text3 ?? "",
            Title4 = partnershipBlockEntity.Title4 ?? "",
            Text4 = partnershipBlockEntity.Text4 ?? "",
        };
    }

    public static PartnershipBlockEntity PartnershipBlockModelToEntity(PartnershipBlock? partnershipBlock)
    {
        if (partnershipBlock == null)
            return null;
            
        return new PartnershipBlockEntity
        {
            MainText = partnershipBlock.MainText ?? "",
            Phone = partnershipBlock.Phone ?? "",
            Image = FileMapper.FileModelToFileEntity(partnershipBlock.Image),
            ImageId = partnershipBlock.ImageId,
            Title1 = partnershipBlock.Title1 ?? "",
            Text1 = partnershipBlock.Text1 ?? "",
            Title2 = partnershipBlock.Title2 ?? "",
            Text2 = partnershipBlock.Text2 ?? "",
            Title3 = partnershipBlock.Title3 ?? "",
            Text3 = partnershipBlock.Text3 ?? "",
            Title4 = partnershipBlock.Title4 ?? "",
            Text4 = partnershipBlock.Text4 ?? "",
        };
    }
    
    public static PartnershipBlockEntity UpdatePartnershipBlockEntity(PartnershipBlockEntity? partnershipBlockEntity, 
                                                                            PartnershipBlock? partnershipBlock)
    {
        if (partnershipBlock == null)
            return null;
            
        partnershipBlockEntity.MainText = partnershipBlock.MainText ?? "";
        partnershipBlockEntity.Phone = partnershipBlock.Phone ?? "";
        partnershipBlockEntity.Image = FileMapper.FileModelToFileEntity(partnershipBlock.Image);
        partnershipBlockEntity.ImageId = partnershipBlock.ImageId;
        partnershipBlockEntity.Title1 = partnershipBlock.Title1 ?? "";
        partnershipBlockEntity.Text1 = partnershipBlock.Text1 ?? "";
        partnershipBlockEntity.Title2 = partnershipBlock.Title2 ?? "";
        partnershipBlockEntity.Text2 = partnershipBlock.Text2 ?? "";
        partnershipBlockEntity.Title3 = partnershipBlock.Title3 ?? "";
        partnershipBlockEntity.Text3 = partnershipBlock.Text3 ?? "";
        partnershipBlockEntity.Title4 = partnershipBlock.Title4 ?? "";
        partnershipBlockEntity.Text4 = partnershipBlock.Text4 ?? "";

        return partnershipBlockEntity;
    }
}
