using Microsoft.AspNetCore.Mvc;

namespace ListaTarefasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private static List<string> tarefas = new List<string>
        {
            "Estudar C#",
            "Fazer o commit semanal",
            "Planejar endpoints da API"
        };

        // GET: api/tarefas
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(tarefas);
        }

        // POST: api/tarefas
        [HttpPost]
        public IActionResult Criar([FromBody] string novaTarefa)
        {
            tarefas.Add(novaTarefa);
            return Created("", novaTarefa);
        }

        // PUT: api/tarefas/1
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] string tarefaAtualizada)
        {
            if (id < 0 || id >= tarefas.Count)
                return NotFound();

            tarefas[id] = tarefaAtualizada;
            return Ok(tarefaAtualizada);
        }

        // DELETE: api/tarefas/1
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            if (id < 0 || id >= tarefas.Count)
                return NotFound();

            var tarefaRemovida = tarefas[id];
            tarefas.RemoveAt(id);
            return Ok($"Tarefa removida: {tarefaRemovida}");
        }
    }
}
