async function carregarTarefas() {
    try {
      const resposta = await fetch('http://localhost:5000/tarefas'); // acredito que a URL é vc que coloca por conta do back
      const tarefas = await resposta.json();
  
      const lista = document.getElementById('lista-tarefas');
      lista.innerHTML = '';
  
      tarefas.forEach(tarefa => {
        const item = document.createElement('li');
        item.textContent = tarefa.titulo;
        lista.appendChild(item);
      });
    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
    }
  }
  
  carregarTarefas();
  