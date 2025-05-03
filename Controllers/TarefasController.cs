using Microsoft.AspNetCore.Mvc;

namespace ListaTarefasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        // GET: api/Tarefas
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "API de Lista de Tarefas funcionando." });
        }
    }
}
