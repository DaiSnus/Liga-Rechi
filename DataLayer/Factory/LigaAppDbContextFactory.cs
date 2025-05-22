using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Liga_Rechi.DataLayer.Factory;

public class LigaAppDbContextFactory : IDesignTimeDbContextFactory<LigaAppDbContext>
{
    public LigaAppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<LigaAppDbContext>();
        var configuration = new ConfigurationBuilder()
            .AddUserSecrets<Program>().
            Build();

        optionsBuilder.UseNpgsql(configuration["db_connection"]);

        return new LigaAppDbContext(optionsBuilder.Options);
    }
}
