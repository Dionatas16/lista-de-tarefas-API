const apiUrl = 'http://localhost:5000/tarefas';

// Carregar as tarefas
async function carregarTarefas() {
  try {
    const resposta = await fetch(apiUrl);
    const tarefas = await resposta.json();

    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    tarefas.forEach(tarefa => {
      const item = document.createElement('li');
      item.textContent = tarefa.titulo;
      item.classList.toggle('concluida', tarefa.concluida);

      // Botão de concluir/desfazer
      const btnConcluir = document.createElement('button');
      btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
      btnConcluir.addEventListener('click', async () => {
        await atualizarTarefa(tarefa.id, { concluida: !tarefa.concluida });
        carregarTarefas();
      });

      // Botão de deletar
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', async () => {
        await deletarTarefa(tarefa.id);
        carregarTarefas();
      });

      item.appendChild(btnConcluir);
      item.appendChild(btnExcluir);
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error('Erro ao carregar tarefas:', erro);
  }
}

async function adicionarTarefa(titulo) {
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo })
    });
    carregarTarefas();
  } catch (erro) {
    console.error('Erro ao adicionar tarefa:', erro);
  }
}

async function deletarTarefa(id) {
  try {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  } catch (erro) {
    console.error('Erro ao deletar tarefa:', erro);
  }
}

async function atualizarTarefa(id, dados) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
  } catch (erro) {
    console.error('Erro ao atualizar tarefa:', erro);
  }
}

// Event listener para o submit do formulário
document.getElementById('form-tarefa').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('nova-tarefa');
  const titulo = input.value.trim();
  if (titulo) {
    adicionarTarefa(titulo);
    input.value = '';
    input.focus();
  }
});

// Inicializar lista e focar no input ao carregar a página
window.onload = () => {
  document.getElementById('nova-tarefa').focus();
  carregarTarefas();
};
