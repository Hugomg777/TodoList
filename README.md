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

```text
todo-list/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── venv/
├── app.py
├── database.py
├── models.py
├── schemas.py
├── auth.py
├── crud.py
├── database.db
├── requirements.txt
├── .env
└── .gitignore
