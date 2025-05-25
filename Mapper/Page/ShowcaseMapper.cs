using Liga_Rechi.DataLayer.Entities.Pages;
using Liga_Rechi.Mapper.Page;
using Liga_Rechi.Services.Models.Admin.Pages;

namespace Liga_Rechi.Mapper;

public static class ShowcaseMapper
{
    public static Showcase ShowcaseEntityToShowcaseModel(ShowcaseEntity? showcaseEntity)
    {
        if (showcaseEntity == null)
            return null;

        return new Showcase
        {
            Id = showcaseEntity.Id,
            BannerFile = FileMapper.FileEntityToFileModel(showcaseEntity.BannerFile),
            BannerFileId = showcaseEntity.BannerFileId,
            PhoneNumber = showcaseEntity.PhoneNumber ?? "",
            SocialLinks = showcaseEntity.SocialLinks ?? "",
            CalendarSubtitle = showcaseEntity.CalendarSubtitle ?? "",
            CalendarLegend = showcaseEntity.CalendarLegend ?? "",
            IsAboutUsEnabled = showcaseEntity.IsAboutUsEnabled,
            AboutUsTitle1 = showcaseEntity.AboutUsTitle1 ?? "",
            AboutUsText1 = showcaseEntity.AboutUsText1 ?? "",
            AboutUsTitle2 = showcaseEntity.AboutUsTitle2 ?? "",
            AboutUsText2 = showcaseEntity.AboutUsText2 ?? "",
            AboutUsTitle3 = showcaseEntity.AboutUsTitle3 ?? "",
            AboutUsText3 = showcaseEntity.AboutUsText3 ?? "",
            IsResidentClubsEnabled = showcaseEntity.IsResidentClubsEnabled,
            ResidentClubsSubtitle = showcaseEntity.ResidentClubsSubtitle,
            IsPartnersEnabled = showcaseEntity.IsPartnersEnabled,
            PartnershipBlock = PartnershipBlockMapper.PartnershipBlockEntityToModel(showcaseEntity.PartnershipBlock),
        };
    }

    public static ShowcaseEntity ShowcaseModelToShowcaseEntity(Showcase? showcase)
    {
        if (showcase == null)
            return null;
            
        return new ShowcaseEntity
        {
            BannerFile = FileMapper.FileModelToFileEntity(showcase.BannerFile),
            BannerFileId = showcase.BannerFileId,
            PhoneNumber = showcase.PhoneNumber ?? "",
            SocialLinks = showcase.SocialLinks ?? "",
            CalendarSubtitle = showcase.CalendarSubtitle ?? "",
            CalendarLegend = showcase.CalendarLegend ?? "",
            IsAboutUsEnabled = showcase.IsAboutUsEnabled,
            AboutUsTitle1 = showcase.AboutUsTitle1 ?? "",
            AboutUsText1 = showcase.AboutUsText1 ?? "",
            AboutUsTitle2 = showcase.AboutUsTitle2 ?? "",
            AboutUsText2 = showcase.AboutUsText2 ?? "",
            AboutUsTitle3 = showcase.AboutUsTitle3 ?? "",
            AboutUsText3 = showcase.AboutUsText3 ?? "",
            IsResidentClubsEnabled = showcase.IsResidentClubsEnabled,
            ResidentClubsSubtitle = showcase.ResidentClubsSubtitle ?? "",
            IsPartnersEnabled = showcase.IsPartnersEnabled,
            PartnershipBlock = PartnershipBlockMapper.PartnershipBlockModelToEntity(showcase.PartnershipBlock),
        };
    }

    public static ShowcaseEntity UpdateShowcaseEntity(ShowcaseEntity? showcaseEntity, Showcase? showcase)
    {
        if (showcase == null)
            return null;
            
        showcaseEntity.BannerFile = FileMapper.FileModelToFileEntity(showcase.BannerFile);
        showcaseEntity.BannerFileId = showcase.BannerFileId;
        showcaseEntity.PhoneNumber = showcase.PhoneNumber ?? "";
        showcaseEntity.SocialLinks = showcase.SocialLinks ?? "";
        showcaseEntity.CalendarSubtitle = showcase.CalendarSubtitle ?? "";
        showcaseEntity.CalendarLegend = showcase.CalendarLegend ?? "";
        showcaseEntity.IsAboutUsEnabled = showcase.IsAboutUsEnabled;
        showcaseEntity.AboutUsTitle1 = showcase.AboutUsTitle1 ?? "";
        showcaseEntity.AboutUsText1 = showcase.AboutUsText1 ?? "";
        showcaseEntity.AboutUsTitle2 = showcase.AboutUsTitle2 ?? "";
        showcaseEntity.AboutUsText2 = showcase.AboutUsText2 ?? "";
        showcaseEntity.AboutUsTitle3 = showcase.AboutUsTitle3 ?? "";
        showcaseEntity.AboutUsText3 = showcase.AboutUsText3 ?? "";
        showcaseEntity.IsResidentClubsEnabled = showcase.IsResidentClubsEnabled;
        showcaseEntity.ResidentClubsSubtitle = showcase.ResidentClubsSubtitle ?? "";
        showcaseEntity.IsPartnersEnabled = showcase.IsPartnersEnabled;
        showcaseEntity.PartnershipBlock = PartnershipBlockMapper.UpdatePartnershipBlockEntity(showcaseEntity.PartnershipBlock, showcase.PartnershipBlock);

        return showcaseEntity;
    }
}
