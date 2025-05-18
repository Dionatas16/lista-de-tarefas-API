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

[HttpGet("listar")]
public IActionResult ListarTarefas()
{
    var tarefas = new List<string>
    {
        "Estudar C#",
        "Fazer o commit semanal",
        "Planejar endpoints da API"
    };

    return Ok(tarefas);
}

}