const apiUrl = 'http://localhost:5160/api/tarefas';

async function carregarTarefas() {
  try {
    const resposta = await fetch(apiUrl);
    const tarefas = await resposta.json();

    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    tarefas.forEach(tarefa => {
      const item = document.createElement('li');

      // Texto da tarefa dentro de um span separado
      const texto = document.createElement('span');
      texto.textContent = tarefa.descricao;
      if (tarefa.concluida) {
        texto.classList.add('concluida');
      }
      item.appendChild(texto);

      // Botão concluir/desfazer
      const btnConcluir = document.createElement('button');
      btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
      btnConcluir.addEventListener('click', async () => {
        await atualizarTarefa(tarefa.id, {
          descricao: tarefa.descricao,
          concluida: !tarefa.concluida
        });
        carregarTarefas();
      });

      // Botão excluir
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', async () => {
        item.classList.add('removendo');
        setTimeout(async () => {
          await deletarTarefa(tarefa.id);
          carregarTarefas();
        }, 300);
      });

      item.appendChild(btnConcluir);
      item.appendChild(btnExcluir);
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
