using Liga_Rechi.DataLayer.Repositories.Abstractions;
using Liga_Rechi.Mapper;
using Liga_Rechi.Mapper.Page;
using Liga_Rechi.Services.Models.Admin.Pages;

namespace Liga_Rechi.DataLayer.Repositories.Implementations;

public class ShowcaseRepository : IShowcaseRepository
{
    private readonly LigaAppDbContext context;

    public ShowcaseRepository(LigaAppDbContext appDbContext)
    {
        this.context = appDbContext;
    }

    public async Task<int?> Create(Showcase showcase)
    {
        var showcaseEntity = ShowcaseMapper.ShowcaseModelToShowcaseEntity(showcase);
        await context.Showcases.AddAsync(showcaseEntity);
        await context.SaveChangesAsync();

        return showcaseEntity.Id;
    }

    public async Task<int?> Delete(int? id)
    {
        var showcase = await context.Showcases.FindAsync(id);
        if (showcase != null)
            context.Showcases.Remove(showcase);

        await context.SaveChangesAsync();

        return showcase?.Id;
    }

    public async Task<int?> Update(Showcase showcase, PartnershipBlock partnershipBlock)
    {
        var existingShowcase = await context.Showcases.FindAsync(showcase.Id);

        ShowcaseMapper.UpdateShowcaseEntity(existingShowcase, showcase);        
        PartnershipBlockMapper.UpdatePartnershipBlockEntity(existingShowcase.PartnershipBlock, partnershipBlock);
        
        await context.SaveChangesAsync();

        return existingShowcase.Id;
    }
}
