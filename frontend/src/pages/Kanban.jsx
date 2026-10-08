import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { getTodos, updateTodo, deleteTodo } from "../services/api"

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

function KanbanCard({
  task,
  onClick,
  onEdit,
  onDelete,
  onComplete,
  onDragStart,
  onDragEnd,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragPreviewRef = useRef(null)

  const priorityLabel =
    task.priority === "alta"
      ? "Alta"
      : task.priority === "media"
        ? "Média"
        : "Baixa"

  const formattedDate = task.due_date
    ? new Date(`${task.due_date}T00:00:00`).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "short",
        }
      )
    : "Sem data"

  function handleDragStart(event) {
    setDragging(true)

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const canvas = document.createElement("canvas")
    const scale = window.devicePixelRatio || 1

    canvas.width = rect.width * scale
    canvas.height = rect.height * scale
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const context = canvas.getContext("2d")

    context.scale(scale, scale)
    context.fillStyle = "#ffffff"
    context.beginPath()
    context.roundRect(0, 0, rect.width, rect.height, 12)
    context.fill()

    context.strokeStyle = "#ddd6fe"
    context.lineWidth = 1
    context.stroke()

    context.fillStyle =
      task.priority === "alta"
        ? "#dc2626"
        : task.priority === "media"
          ? "#d97706"
          : "#16a34a"

    context.beginPath()
    context.roundRect(16, 16, 52, 22, 6)
    context.fill()

    context.fillStyle = "#ffffff"
    context.font = "500 12px Arial"

    context.fillText(
      task.priority === "alta"
        ? "Alta"
        : task.priority === "media"
          ? "Média"
          : "Baixa",
      24,
      31
    )

    context.fillStyle = "#171b2d"
    context.font = "600 16px Arial"

    const title =
      task.title.length > 38
        ? `${task.title.slice(0, 38)}...`
        : task.title

    context.fillText(title, 16, 72)

    if (task.category) {
      context.fillStyle = "#6c4ce8"
      context.font = "500 12px Arial"

      const category =
        task.category.length > 25
          ? `${task.category.slice(0, 25)}...`
          : task.category

      context.fillText(category, 16, 100)
    }

    context.fillStyle = "#9ca3af"
    context.font = "12px Arial"

    const date = task.due_date
      ? new Date(`${task.due_date}T00:00:00`).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "short",
          }
        )
      : "Sem data"

    context.fillText(date, 16, rect.height - 18)
    context.fillText(`#${task.id}`, rect.width - 35, rect.height - 18)

    document.body.appendChild(canvas)
    dragPreviewRef.current = canvas

    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setDragImage(
      canvas,
      event.clientX - rect.left,
      event.clientY - rect.top
    )

    onDragStart(event, task)
  }

  function handleDragEnd(event) {
    setDragging(false)

    if (dragPreviewRef.current) {
      dragPreviewRef.current.remove()
      dragPreviewRef.current = null
    }

    onDragEnd(event)
  }

  return (
    <article
      className={`kanban-card ${dragging ? "kanban-card-dragging" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
    >
      <div className="kanban-card-top">
        <span
          className={`kanban-priority kanban-priority-${task.priority}`}
        >
          {priorityLabel}
        </span>

        <div className="kanban-more-wrapper">
          <button
            type="button"
            className="kanban-more-button"
            onClick={(event) => {
              event.stopPropagation()
              setMenuOpen((current) => !current)
            }}
          >
            <MoreIcon />
          </button>

          {menuOpen && (
            <div
              className="kanban-card-menu"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => onEdit(task.id)}
              >
                Editar
              </button>

              {task.state !== "concluído" && (
                <button
                  type="button"
                  onClick={() => onComplete(task.id)}
                >
                  <CheckIcon />
                  Concluir
                </button>
              )}

              <button
                type="button"
                className="kanban-delete-action"
                onClick={() => onDelete(task.id)}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      <h3>{task.title}</h3>

      {task.category && (
        <span className="kanban-category">
          {task.category}
        </span>
      )}

      <div className="kanban-card-footer">
        <div className="kanban-date">
          <CalendarIcon />
          <span>{formattedDate}</span>
        </div>

        <div className="kanban-task-id">
          #{task.id}
        </div>
      </div>
    </article>
  )
}

function KanbanColumn({
  title,
  count,
  type,
  tasks,
  onTaskClick,
  onEdit,
  onDelete,
  onComplete,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDrop,
  dragOverColumn,
}) {
  return (
    <section
      className={`kanban-column kanban-column-${type} ${
        dragOverColumn === type ? "kanban-column-drag-over" : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
      }}
      onDragEnter={() => onDragEnter(type)}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onDragEnter(null)
        }
      }}
      onDrop={(event) => onDrop(event, type)}
    >
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          <span className="kanban-column-indicator"></span>
          <h2>{title}</h2>
          <span className="kanban-column-count">
            {count}
          </span>
        </div>

        {type === "todo" && (
          <button
            type="button"
            className="kanban-column-add"
            onClick={() => onTaskClick(null)}
          >
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
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
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
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [draggedTask, setDraggedTask] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  async function loadTasks() {
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    try {
      const data = await getTodos()
      setTasks(data)
    } catch {
      localStorage.removeItem("access_token")
      localStorage.removeItem("token")
      navigate("/login")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function updateTaskState(id, state) {
    try {
      const updatedTask = await updateTodo(id, { state })

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      )

      setError("")
    } catch {
      setError("Não foi possível atualizar a tarefa.")
    }
  }

  async function handleComplete(id) {
    await updateTaskState(id, "concluído")
  }

  function handleDragStart(event, task) {
    setDraggedTask(task)
    setDragOverColumn(null)

    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData(
      "text/plain",
      String(task.id)
    )
  }

  function handleDragEnd() {
    setDraggedTask(null)
    setDragOverColumn(null)
  }

  function handleDragEnter(type) {
    if (draggedTask) {
      setDragOverColumn(type)
    }
  }

  async function handleDrop(event, columnType) {
    event.preventDefault()

    if (!draggedTask) {
      return
    }

    const stateMap = {
      todo: "a fazer",
      progress: "fazendo",
      completed: "concluído",
    }

    const newState = stateMap[columnType]

    setDragOverColumn(null)

    if (
      !newState ||
      draggedTask.state === newState
    ) {
      setDraggedTask(null)
      return
    }

    await updateTaskState(
      draggedTask.id,
      newState
    )

    setDraggedTask(null)
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteTodo(id)

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== id
        )
      )

      setError("")
    } catch {
      setError("Não foi possível excluir a tarefa.")
    }
  }

  function handleTaskClick(id) {
    if (id === null) {
      navigate("/tarefas/nova")
      return
    }

    navigate(`/tarefas/${id}`)
  }

  const todoTasks = tasks.filter(
    (task) => task.state === "a fazer"
  )

  const progressTasks = tasks.filter(
    (task) => task.state === "fazendo"
  )

  const completedTasks = tasks.filter(
    (task) => task.state === "concluído"
  )

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />

        <div className="app-main">
          <Header />

          <main className="kanban-content">
            <p>Carregando tarefas...</p>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <main className="kanban-content">
          <div className="kanban-page-header">
            <div>
              <p className="page-eyebrow">
                ORGANIZAÇÃO
              </p>

              <h1>Kanban</h1>

              <p>
                Visualize e organize suas tarefas de forma simples.
              </p>
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

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          <div className="kanban-board">
            <KanbanColumn
              title="A fazer"
              count={todoTasks.length}
              type="todo"
              tasks={todoTasks}
              onTaskClick={handleTaskClick}
              onEdit={(id) =>
                navigate(`/tarefas/${id}/editar`)
              }
              onDelete={handleDelete}
              onComplete={handleComplete}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              dragOverColumn={dragOverColumn}
            />

            <KanbanColumn
              title="Em andamento"
              count={progressTasks.length}
              type="progress"
              tasks={progressTasks}
              onTaskClick={handleTaskClick}
              onEdit={(id) =>
                navigate(`/tarefas/${id}/editar`)
              }
              onDelete={handleDelete}
              onComplete={handleComplete}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              dragOverColumn={dragOverColumn}
            />

            <KanbanColumn
              title="Concluídas"
              count={completedTasks.length}
              type="completed"
              tasks={completedTasks}
              onTaskClick={handleTaskClick}
              onEdit={(id) =>
                navigate(`/tarefas/${id}/editar`)
              }
              onDelete={handleDelete}
              onComplete={handleComplete}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              dragOverColumn={dragOverColumn}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Kanban