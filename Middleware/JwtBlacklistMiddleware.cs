namespace Middleware;

public class JwtBlacklistMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IBlacklistService _blacklistService;

    public JwtBlacklistMiddleware(RequestDelegate next, IBlacklistService blacklistService)
    {
        _next = next;
        _blacklistService = blacklistService;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token != null && _blacklistService.IsTokenBlacklisted(token))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            var message = "У вас нет доступа к этому ресурсу.";
            await context.Response.WriteAsync(message);
            return;
        }

        await _next(context);
    }
}