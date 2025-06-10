
# ✅ Lista de Tarefas - API com Front-end em React

## 🧾 Descrição

Esta aplicação é uma API completa para gerenciamento de tarefas, com funcionalidades de **criação**, **leitura**, **atualização** e **remoção** de tarefas (CRUD).  

O projeto também conta com um **front-end desenvolvido em React**, que permite ao usuário interagir com a API de forma amigável e visual.

---

## 👥 Integrantes da Dupla

- Diônatas Gabriel Mota dos Santos - (https://github.com/Dionatas16)
- Mariana Moreira Kleina - (https://github.com/mariana-kleina)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem (Back-end):** C# (.NET 8)
- **Framework (Back-end):** ASP.NET Core
- **ORM:** Entity Framework Core
- **Banco de Dados:** MySQL
- **Front-end:** React.js
- **Versionamento:** Git + GitHub

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)
- [Node.js + npm](https://nodejs.org/) instalados
- MySQL instalado
- Git instalado

### 🔧 Execução do Back-end

```bash
# 1. Clone o repositório
git clone https://github.com/usuario/repositorio

# 2. Acesse a pasta do back-end
cd lista-de-tarefas-API

# 3. Restaure os pacotes
dotnet restore

# 4. Execute a aplicação
dotnet run
```

### 💻 Execução do Front-end

```bash
# 1. Acesse a pasta do front-end
cd frontend

# 2. Instale as dependências
npm install

# 3. Execute a aplicação React
npm start
```

---

## 🧪 Funcionalidades

- ✅ Criar novas tarefas
- 📋 Listar todas as tarefas cadastradas
- ✏️ Atualizar tarefas existentes
- ❌ Remover tarefas
- 🖥️ Interface gráfica com React integrada à API

---

## 🔐 Observações

- Certifique-se de configurar corretamente a `connection string` no `appsettings.json` para conectar ao seu banco MySQL.
- Caso deseje popular o banco com dados iniciais, utilize as migrations.
- O front-end está configurado para se comunicar com a API local. Altere a URL base no código React se necessário.
