using Liga_Rechi.Attributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Liga_Rechi.Filters;

public class RoleAuthorizeFilter : IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        var endpoint = context.HttpContext.GetEndpoint();
        var roleAttribute = endpoint?.Metadata.GetMetadata<RoleAuthorizeAttribute>();

        if (roleAttribute != null)
        {
            var roles = roleAttribute.Roles;

            if (!user.Identity.IsAuthenticated || !roles.Any(role => user.IsInRole(role)))
            {
                context.Result = new ObjectResult(new
                {
                    message = "У вас нет доступа к этому ресурсу.",
                })
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                };
            }
        }
    }
}