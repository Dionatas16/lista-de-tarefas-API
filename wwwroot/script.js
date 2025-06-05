const apiUrl = 'http://localhost:5160/api/tarefas';

async function carregarTarefas() {
  try {
    const resposta = await fetch(apiUrl);
    const tarefas = await resposta.json();

    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    tarefas.forEach(tarefa => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex justify-content-between align-items-center';

      // Texto da tarefa
      const texto = document.createElement('span');
      texto.textContent = tarefa.descricao;
      if (tarefa.concluida) {
        texto.classList.add('concluida');
      }

      // Grupo de botões
      const botoes = document.createElement('div');
      botoes.className = 'btn-group btn-group-sm';

      const btnConcluir = document.createElement('button');
      btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
      btnConcluir.className = 'btn btn-success';
      btnConcluir.addEventListener('click', async () => {
        await atualizarTarefa(tarefa.id, {
          descricao: tarefa.descricao,
          concluida: !tarefa.concluida
        });
        carregarTarefas();
      });

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.className = 'btn btn-danger';
      btnExcluir.addEventListener('click', async () => {
        item.classList.add('removendo');
        setTimeout(async () => {
          await deletarTarefa(tarefa.id);
          carregarTarefas();
        }, 300);
      });

      botoes.appendChild(btnConcluir);
      botoes.appendChild(btnExcluir);

      item.appendChild(texto);
      item.appendChild(botoes);
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error('Erro ao carregar tarefas:', erro);
  }
}

async function adicionarTarefa(descricao) {
  try {
    const resposta = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao: descricao })
    });

    if (!resposta.ok) {
      throw new Error('Erro ao adicionar tarefa');
    }

    alert('Tarefa adicionada com sucesso!');
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

document.getElementById('form-tarefa').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('nova-tarefa');
  const descricao = input.value.trim();

  const lista = document.querySelectorAll('#lista-tarefas li span');
  const jaExiste = Array.from(lista).some(span => span.textContent === descricao);
  if (jaExiste) {
    alert('Essa tarefa já existe!');
    return;
  }

  if (descricao) {
    adicionarTarefa(descricao);
    input.value = '';
    input.focus();
  }
});

window.onload = () => {
  document.getElementById('nova-tarefa').focus();
  carregarTarefas();
};
