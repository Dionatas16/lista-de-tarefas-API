using Microsoft.AspNetCore.Mvc;
using ListaTarefasApi.Models;

namespace ListaTarefasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private static List<Tarefa> tarefas = new List<Tarefa>();
        private static int proximoId = 1;

        // GET: api/tarefas
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(tarefas);
        }

        // GET: api/tarefas/1
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            var tarefa = tarefas.FirstOrDefault(t => t.Id == id);
            if (tarefa == null)
                return NotFound();

            return Ok(tarefa);
        }

        // POST: api/tarefas
        [HttpPost]
        public IActionResult Criar([FromBody] Tarefa novaTarefa)
        {
            novaTarefa.Id = proximoId++;
            tarefas.Add(novaTarefa);
            return CreatedAtAction(nameof(BuscarPorId), new { id = novaTarefa.Id }, novaTarefa);
        }

        // PUT: api/tarefas/1
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] Tarefa tarefaAtualizada)
        {
            var tarefa = tarefas.FirstOrDefault(t => t.Id == id);
            if (tarefa == null)
                return NotFound();

            tarefa.Descricao = tarefaAtualizada.Descricao;
            tarefa.Concluida = tarefaAtualizada.Concluida;

            return Ok(tarefa);
        }

        // DELETE: api/tarefas/1
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var tarefa = tarefas.FirstOrDefault(t => t.Id == id);
            if (tarefa == null)
                return NotFound();

            tarefas.Remove(tarefa);
            return NoContent();
        }
    }
}
