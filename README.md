# NEXO

NEXO é uma aplicação web de gerenciamento de tarefas desenvolvida com React e FastAPI. O projeto permite organizar tarefas, acompanhar seu progresso e visualizar atividades através de diferentes formatos, como dashboard e Kanban.

## Tecnologias

### Frontend
- React
- Vite
- JavaScript
- React Router
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- JWT
- Pydantic
- pwdlib

## Estrutura do projeto

README.md:

# Como rodar o projeto

## Backend

Na pasta raiz do projeto, abra o terminal e execute:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload

O backend estará disponível em:

http://127.0.0.1:8000

A documentação da API estará disponível em:

http://127.0.0.1:8000/docs
```
### Frontend

Abra outro terminal, entre na pasta do frontend e execute:

- cd frontend
- npm install
- npm run dev

Acesse o sistema pelo navegador:

http://localhost:5173
