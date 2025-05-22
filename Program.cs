using Liga_Rechi.DataLayer;
using Liga_Rechi.Services.Auth;
using Liga_Rechi.Services.Initializers;
using Microsoft.EntityFrameworkCore;

namespace Liga_Rechi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Configuration.AddUserSecrets<Program>();

        CheckSecretsAndDbConnection(builder);

        ConfigureServices(builder.Services, builder.Configuration);
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        ConfigureMiddleware(app);

        using var scope = app.Services.CreateScope();
        using var appDbContext = scope.ServiceProvider.GetRequiredService<LigaAppDbContext>();
        //DbContextInitializer.InitializeDbContext(appDbContext, new Encrypt());

        // Настройка порта для Railway
        var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
        app.Urls.Add($"http://0.0.0.0:{port}");

        app.Run();
    } 

    private static void CheckSecretsAndDbConnection(WebApplicationBuilder builder)
    {
        if (builder.Configuration["db_connection"] == null
         || builder.Configuration["db_connection"]!.Length == 0)
            throw new Exception("no_database_connection");
        if (builder.Configuration["secret"] == null
         || builder.Configuration["secret"]!.Length == 0)
            throw new Exception("no_secret");
    }

    private static void ConfigureMiddleware(WebApplication app)
    {
        app.UseStaticFiles();
        app.UseRouting();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
    }

    private static void ConfigureServices(IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddControllers();

        services.AddDbContext<LigaAppDbContext>(options =>
            options.UseNpgsql(configuration["db_connection"]));

        services.AddScoped<IEncrypt, Encrypt>();
    }
}
