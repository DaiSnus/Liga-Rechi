
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Liga_Rechi.Services.Auth.Roles;
using Liga_Rechi.Services.Models.Roles;
using Microsoft.IdentityModel.Tokens;
using Middleware;

namespace Liga_Rechi.Services.Auth;

public class Auth : IAuth
{
    private readonly IBlacklistService _blacklistService;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public Auth(IBlacklistService blacklistService, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _blacklistService = blacklistService;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }

    public string GenerateJwtToken<T>(T user)
    {
        Console.WriteLine($"Generating token for user:  {(user as IUser)?.UniqueId}");
        var userRoles = new List<string>();

        if (user is User userModel)
            userRoles.Add(UserRoles.User);
        else if (user is Admin admin)
            userRoles.Add(UserRoles.Admin);
        else
            throw new ArgumentException("Неподдерживаемый тип пользователя");
        
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, (user as IUser)?.UniqueId.ToString() ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        
        claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["secret"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public int? GetCurrentUserId()
    {
        var claimsIdentity = _httpContextAccessor.HttpContext?.User.Identity as ClaimsIdentity;
        int id = int.Parse(claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "-1");
        return id;
    }

    public List<string> GetCurrentUserRoles()
    {
        var claimsIdentity = _httpContextAccessor.HttpContext?.User.Identity as ClaimsIdentity;
        return claimsIdentity?.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList() ?? new List<string>();
    }

    public void Logout(string token)
    {
        _blacklistService.AddTokenToBlacklist(token);
    }
}
