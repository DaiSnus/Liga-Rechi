using Liga_Rechi.DataLayer.Entities.Pages;
using Liga_Rechi.Services.Models.Admin.Pages;

namespace Liga_Rechi.DataLayer.Repositories.Abstractions;

public interface IShowcaseRepository
{
    Task<int?> Create(Showcase showcase);
    Task<int?> Update(Showcase showcase, PartnershipBlock partnershipBlock);
    Task<int?> Delete(int? id);
}
