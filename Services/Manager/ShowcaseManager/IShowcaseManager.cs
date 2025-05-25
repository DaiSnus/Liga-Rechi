using Liga_Rechi.Services.Models.Admin.Pages;

namespace Liga_Rechi.Services.Manager.ShowcaseManager;

public interface IShowcaseManager
{
    Task<int?> Create(Showcase showcase);
    Task<int?> Update(Showcase showcase, PartnershipBlock partnershipBlock);
}
