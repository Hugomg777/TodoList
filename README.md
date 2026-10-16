# NEXO — Gerenciador de Tarefas

O NEXO é uma aplicação web para organizar tarefas pessoais. O usuário pode criar tarefas, definir prioridade, categoria e prazo, acompanhar seu status e visualizar suas atividades em uma lista ou quadro Kanban.

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação, consulta, edição e exclusão de tarefas
- Organização por status e prioridade
- Filtros por status e prioridade
- Busca de tarefas
- Visualização de tarefas no Dashboard e no Kanban
- Marcação de tarefas como concluídas
- Acesso às páginas privadas mediante autenticação

## Tecnologias utilizadas

**Backend:** Python, FastAPI, SQLAlchemy e SQLite  
**Frontend:** React, Vite e JavaScript  
**Autenticação:** JWT  
**Versionamento:** Git e GitHub

## Requisitos

Antes de executar o projeto, instale:

- [Python](https://www.python.org/downloads/)
- [Node.js e npm](https://nodejs.org/)
- [Git](https://git-scm.com/downloads/)

## Como executar o projeto

As instruções abaixo consideram o Windows e o PowerShell. O backend e o frontend devem ser executados em terminais separados.

### 1. Clonar o repositório

```bash
git clone https://github.com/Hugomg777/TodoList.git
cd TodoList
```

### 2. Configurar o backend

Na pasta principal do projeto, crie um ambiente virtual:

```powershell
python -m venv venv
```

Ative o ambiente virtual:

```powershell
.\venv\Scripts\Activate.ps1
```

Se o PowerShell bloquear a ativação do ambiente, consulte as instruções de execução de scripts do próprio PowerShell ou use o terminal Git Bash:

```bash
source venv/Scripts/activate
```

Instale as dependências do backend:

```bash
pip install -r requirements.txt
```

Crie um arquivo chamado `.env` na raiz do projeto, com as configurações abaixo:

```env
DATABASE_URL=sqlite+aiosqlite:///./database.db
SECRET_KEY=coloque_uma_chave_secreta_aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Substitua o valor de `SECRET_KEY` por uma chave secreta própria. Não compartilhe esse valor nem envie o arquivo `.env` para o GitHub.

Inicialize o banco de dados:

```bash
python -m backend.init_db
```

Inicie a API:

```bash
uvicorn backend.app:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

A documentação interativa da API pode ser acessada pelo Swagger:

```text
http://127.0.0.1:8000/docs
```

### 3. Configurar o frontend

Abra um segundo terminal e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite mostrará o endereço local no terminal. Normalmente, a aplicação fica disponível em:

```text
http://localhost:5173
```

Abra esse endereço no navegador. Crie uma conta pela tela de cadastro ou entre com uma conta já registrada.


```

O backend concentra as rotas, regras de negócio, modelos e acesso ao banco de dados. O frontend contém as páginas, os componentes de interface e o módulo de serviços responsável pelas requisições à API.

## Documentação técnica

A documentação técnica do NEXO apresenta a arquitetura do sistema, suas funcionalidades, a organização do backend e frontend, as rotas da API, o banco de dados, os procedimentos de execução e os testes realizados.

[📄 Acessar a documentação técnica do NEXO](./DocumentacaoTec_NEXOcorrigido.docx)

## Observações

- O banco utilizado no projeto é SQLite. O arquivo do banco é criado localmente e não precisa ser enviado ao repositório.
- O arquivo `.env` contém configurações locais e deve permanecer fora do versionamento.
- O comando `npm run dev` inicia o servidor de desenvolvimento do frontend.
- Para utilizar a aplicação, mantenha o backend e o frontend em execução ao mesmo tempo.

## Autor

Desenvolvido por Hugo Nilson.
