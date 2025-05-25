using Liga_Rechi.DataLayer;
using Liga_Rechi.Services.Auth;
using Liga_Rechi.Services.Initializers;
using Liga_Rechi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using NLog.Web;
using NLog;
using System.Security.Claims;
using Liga_Rechi.DataLayer.Repositories.Abstractions;
using Liga_Rechi.DataLayer.Repositories.Implementations;
using Microsoft.AspNetCore.Identity;
using Liga_Rechi.Services.Manager.AdminManager;
using Liga_Rechi.Services.Manager.ShowcaseManager;
using Liga_Rechi.Filters;
using Middleware;

namespace Liga_Rechi;

public class Program
{
    public static void Main(string[] args)
    {
        var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
        logger.Debug("Initialize");
        
        try 
        {
            var builder = WebApplication.CreateBuilder(args);

            ConfigureLogging(builder);

            builder.Configuration.AddUserSecrets<Program>()
                                 .AddEnvironmentVariables();

            CheckSecretsAndDbConnection(builder);

            var configuration = builder.Configuration;

            AddAuthentication(builder.Services, configuration);
            ConfigureServices(builder.Services, configuration);
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            ConfigureMiddleware(app);

            app.MapControllers();

            using var scope = app.Services.CreateScope();
            using var appDbContext = scope.ServiceProvider.GetRequiredService<LigaAppDbContext>();
            //DbContextInitializer.InitializeDbContext(appDbContext, new Encrypt());

            // Настройка порта для Railway
            var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

            app.Run();
        }
        catch (Exception ex)
        {

        }
        finally
        {
            NLog.LogManager.Shutdown();
        }
    } 

    private static void ConfigureLogging(WebApplicationBuilder builder)
    {
        builder.Logging.ClearProviders();
        builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
        builder.Host.UseNLog();
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
        app.UseMiddleware<JwtBlacklistMiddleware>();

        app.UseStaticFiles();
        app.UseRouting();

        app.MapControllers();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();
    }

    private static void ConfigureServices(IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddControllers();

        services.AddDbContext<LigaAppDbContext>(options =>
            options.UseNpgsql(configuration["db_connection"]));

        services.AddScoped<IAuth, Auth>();
        services.AddScoped<Auth>();
        services.AddScoped<IEncrypt, Encrypt>();

        services.AddScoped<IAdminRepository, AdminRepository>();
        services.AddScoped<IShowcaseRepository, ShowcaseRepository>();
 
        services.AddScoped<IAdminManager, AdminManager>();
        services.AddScoped<IShowcaseManager, ShowcaseManager>();

        services.AddScoped<RoleAuthorizeFilter>();

        services.AddEndpointsApiExplorer();

        services.AddMemoryCache();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<IBlacklistService, BlacklistService>();
    }

    private static void AddAuthentication(IServiceCollection services, ConfigurationManager configuration)
    {
        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["secret"]!)),
                    RoleClaimType = ClaimTypes.Role
                };
            });
    }
}
