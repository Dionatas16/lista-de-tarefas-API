const API_URL = 'http://localhost:5000/tarefas';

// Carregar as tarefas
async function carregarTarefas() {
  try {
    const resposta = await fetch(API_URL);
    const tarefas = await resposta.json();

    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    tarefas.forEach(tarefa => {
      const item = document.createElement('li');
      item.textContent = tarefa.titulo;
      item.className = tarefa.concluida ? 'concluida' : '';

      // Botão de concluir
      const btnConcluir = document.createElement('button');
      btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
      btnConcluir.onclick = () => atualizarStatus(tarefa.id, !tarefa.concluida);

      // Botão de excluir
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.onclick = () => excluirTarefa(tarefa.id);

      item.appendChild(btnConcluir);
      item.appendChild(btnExcluir);
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error('Erro ao carregar tarefas:', erro);
  }
}

// Adicionar uma nova tarefa
async function adicionarTarefa(evento) {
  evento.preventDefault();
  const input = document.getElementById('nova-tarefa');
  const titulo = input.value.trim();

  if (titulo === '') return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo })
    });
    input.value = '';
    carregarTarefas();
  } catch (erro) {
    console.error('Erro ao adicionar tarefa:', erro);
  }
}

// Atualizar o status (concluída/não concluída)
async function atualizarStatus(id, novoStatus) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concluida: novoStatus })
    });
    carregarTarefas();
  } catch (erro) {
    console.error('Erro ao atualizar status:', erro);
  }
}

// Excluir uma tarefa
async function excluirTarefa(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    carregarTarefas();
  } catch (erro) {
    console.error('Erro ao excluir tarefa:', erro);
  }
}

// Inicialização
document.getElementById('form-tarefa').addEventListener('submit', adicionarTarefa);
carregarTarefas();
