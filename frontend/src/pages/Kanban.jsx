import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

const tasks = {
  todo: [
    {
      id: 1,
      title: "Estudar para avaliação",
      category: "Estudos",
      date: "08 set",
      priority: "alta",
    },
    {
      id: 2,
      title: "Organizar arquivos do projeto",
      category: "Projeto",
      date: "12 set",
      priority: "baixa",
    },
    {
      id: 3,
      title: "Preparar apresentação",
      category: "Trabalho",
      date: "15 set",
      priority: "media",
    },
  ],
  progress: [
    {
      id: 4,
      title: "Finalizar documentação do projeto",
      category: "Projeto",
      date: "10 set",
      priority: "media",
    },
    {
      id: 5,
      title: "Revisar metodologia do TCC",
      category: "Estudos",
      date: "09 set",
      priority: "alta",
    },
  ],
  completed: [
    {
      id: 6,
      title: "Configurar ambiente de desenvolvimento",
      category: "Projeto",
      date: "02 set",
      priority: "baixa",
    },
    {
      id: 7,
      title: "Criar estrutura inicial do projeto",
      category: "Projeto",
      date: "03 set",
      priority: "media",
    },
  ],
}

function KanbanCard({ task, onClick }) {
  return (
    <article className="kanban-card" onClick={onClick}>
      <div className="kanban-card-top">
        <span className={`kanban-priority kanban-priority-${task.priority}`}>
          {task.priority === "alta"
            ? "Alta"
            : task.priority === "media"
              ? "Média"
              : "Baixa"}
        </span>

        <button
          type="button"
          className="kanban-more-button"
          onClick={(event) => event.stopPropagation()}
        >
          <MoreIcon />
        </button>
      </div>

      <h3>{task.title}</h3>

      <span className="kanban-category">{task.category}</span>

      <div className="kanban-card-footer">
        <div className="kanban-date">
          <CalendarIcon />
          <span>{task.date}</span>
        </div>

        <div className="kanban-task-id">#{task.id}</div>
      </div>
    </article>
  )
}

function KanbanColumn({ title, count, type, tasks, onTaskClick }) {
  return (
    <section className={`kanban-column kanban-column-${type}`}>
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          <span className="kanban-column-indicator"></span>
          <h2>{title}</h2>
          <span className="kanban-column-count">{count}</span>
        </div>

        {type === "todo" && (
          <button type="button" className="kanban-column-add">
            <PlusIcon />
          </button>
        )}
      </div>

      <div className="kanban-column-content">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <div className="kanban-empty">
            <span>Nenhuma tarefa aqui</span>
          </div>
        )}
      </div>
    </section>
  )
}

function Kanban() {
  const navigate = useNavigate()

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <main className="kanban-content">
          <div className="kanban-page-header">
            <div>
              <p className="page-eyebrow">ORGANIZAÇÃO</p>
              <h1>Kanban</h1>
              <p>Visualize e organize suas tarefas de forma simples.</p>
            </div>

            <button
              type="button"
              className="kanban-new-task-button"
              onClick={() => navigate("/tarefas/nova")}
            >
              <PlusIcon />
              Nova tarefa
            </button>
          </div>

          <div className="kanban-board">
            <KanbanColumn
              title="A fazer"
              count={tasks.todo.length}
              type="todo"
              tasks={tasks.todo}
              onTaskClick={(id) => navigate(`/tarefas/${id}`)}
            />

            <KanbanColumn
              title="Em andamento"
              count={tasks.progress.length}
              type="progress"
              tasks={tasks.progress}
              onTaskClick={(id) => navigate(`/tarefas/${id}`)}
            />

            <KanbanColumn
              title="Concluídas"
              count={tasks.completed.length}
              type="completed"
              tasks={tasks.completed}
              onTaskClick={(id) => navigate(`/tarefas/${id}`)}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Kanban