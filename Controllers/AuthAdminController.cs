using System.Text.Json;
using Liga_Rechi.Attributes;
using Liga_Rechi.Filters;
using Liga_Rechi.Services.Auth;
using Liga_Rechi.Services.Auth.Roles;
using Liga_Rechi.Services.Manager.AdminManager;
using Liga_Rechi.Services.Models.Admin.Auth;
using Liga_Rechi.Services.Models.Roles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Liga_Rechi.Controllers;

[Route("auth")]
[ApiController]
public class AuthAdminController : ControllerBase
{
    private readonly IAuth auth;
    private readonly IEncrypt encrypt;
    private readonly IAdminManager adminManager;
    private readonly ILogger<AuthController> logger;
    private readonly IConfiguration configuration;

    public AuthAdminController(
        IAuth auth, 
        IEncrypt encrypt, 
        IAdminManager adminManager, 
        ILogger<AuthController> logger,
        IConfiguration configuration)
    {
        this.auth = auth;
        this.encrypt = encrypt;
        this.adminManager = adminManager;
        this.logger = logger;
        this.configuration = configuration;
    }

    [HttpPost("login/admin")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel model)
    {
        try
        {
            if (auth.GetCurrentUserId() != -1){
                throw new Exception("Вы уже авторизованы.");
            }

            var user = await adminManager.ValidateOperatorCredentials(model.Email, model.Password);
            if (user == null)
                return Unauthorized("Неверный email или пароль.");
            var token = auth.GenerateJwtToken(user);
            logger.LogInformation($"LOGIN: User with id \"{user.Id}\" has been authorized.");
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            logger.LogError($"LOGIN FAILED: Failed admin login.");
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("register/admin")]
    public async Task<IActionResult> Register([FromBody] Admin model, [FromQuery] string adminKey)
    {
        try
        {
            var secretKey = configuration["admin_secret"];
            if (string.IsNullOrEmpty(secretKey) || adminKey != secretKey)
            {
                logger.LogWarning("ADMIN REGISTRATION FAILED: Invalid admin key used");
                return BadRequest("Неверный ключ администратора");
            }

            var adminId = await adminManager.Create(model);
            if (adminId == null)
            {
                return BadRequest("Ошибка при регистрации администратора");
            }

            logger.LogInformation($"REGISTER: A new Operator with id \"{adminId}\" has been created.");
            return Ok(adminId);
        }
        catch (Exception ex)
        {
            logger.LogError($"\nREGISTER FAILED: Failed register admin." +
                                      $"\nMessage: {ex.Message}" +
                                      $"\nModel: {JsonSerializer.Serialize(model)}\n");
                return BadRequest(ex.Message);
        }
    }
}
