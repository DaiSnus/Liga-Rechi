using Microsoft.AspNetCore.Mvc;

namespace Liga_Rechi.Controllers;

[ApiController]
[Route("showcase")]
public class HomeController : ControllerBase
{
    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        return Ok();
    }
}