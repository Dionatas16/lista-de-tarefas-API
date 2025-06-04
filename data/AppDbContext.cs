using Microsoft.EntityFrameworkCore;
using ListaTarefasApi.Models;

namespace ListaTarefasApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Tarefa> Tarefas { get; set; }
    }
}
