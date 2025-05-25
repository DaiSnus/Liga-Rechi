using Liga_Rechi.DataLayer.Repositories.Abstractions;
using Liga_Rechi.Services.Models.Admin.Pages;

namespace Liga_Rechi.Services.Manager.ShowcaseManager;

public class ShowcaseManager : IShowcaseManager
{
    private readonly IShowcaseRepository showcaseRepository;

    public ShowcaseManager(IShowcaseRepository showcaseRepository)
    {
        this.showcaseRepository = showcaseRepository;
    }

    public async Task<int?> Create(Showcase showcase)
    {
        return await showcaseRepository.Create(showcase);
    }

    public async Task<int?> Update(Showcase showcase, PartnershipBlock partnershipBlock)
    {
        return await showcaseRepository.Update(showcase, partnershipBlock);
    }
}
