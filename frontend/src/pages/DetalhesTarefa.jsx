import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { getTodo, updateTodo, deleteTodo } from "../services/api"

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
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

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1 0-2.8V4a1 1 0 0 1 1-1h6.6a2 2 0 0 1 1.4.6l7.2 7a2 2 0 0 1 0 2.8Z" />
      <circle cx="8" cy="8" r="1.2" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V4" />
      <path d="M5 4c4-3 6 3 10 0v9c-4 3-6-3-10 0" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 15H6L5 6" />
      <path d="M10 11v6M14 11v6" />
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

function DetalhesTarefa() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState("")
  const [actionError, setActionError] = useState("")

  useEffect(() => {
    async function loadTask() {
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        const data = await getTodo(id)
        setTask(data)
      } catch (err) {
        if (err.message === "Could not validate credentials") {
          localStorage.removeItem("access_token")
          localStorage.removeItem("token")
          navigate("/login")
          return
        }

        setError(
          err.message || "Não foi possível carregar a tarefa."
        )
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id, navigate])

  async function handleComplete() {
    if (!task || actionLoading) {
      return
    }

    setActionLoading(true)
    setActionError("")

    const newState =
      task.state === "concluído" ? "a fazer" : "concluído"

    try {
      const updatedTask = await updateTodo(id, {
        state: newState,
      })

      setTask(updatedTask)
    } catch (err) {
      if (err.message === "Could not validate credentials") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      setActionError(
        err.message || "Não foi possível atualizar a tarefa."
      )
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    )

    if (!confirmed) {
      return
    }

    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    try {
      await deleteTodo(id)
      navigate("/dashboard")
    } catch (err) {
      if (err.message === "Could not validate credentials") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("token")
        navigate("/login")
      }
    }
  }

  const getPriorityLabel = (priority) => {
    if (priority === "alta") return "Alta"
    if (priority === "media") return "Média"
    return "Baixa"
  }

  const getStateLabel = (state) => {
    if (state === "concluído") return "Concluída"
    if (state === "fazendo") return "Em andamento"
    if (state === "a fazer") return "A fazer"
    if (state === "rascunho") return "Rascunho"
    if (state === "lixeira") return "Lixeira"
    return state
  }

  const formatDate = (date) => {
    if (!date) {
      return "Sem prazo definido"
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    )
  }

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">
          <Header />
          <main className="task-details-content">
            <p>Carregando tarefa...</p>
          </main>
        </div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">
          <Header />
          <main className="task-details-content">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeftIcon />
              Voltar
            </button>

            <h1>{error || "Tarefa não encontrada"}</h1>
          </main>
        </div>
      </div>
    )
  }

  const isCompleted = task.state === "concluído"

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <main className="task-details-content">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeftIcon />
            Voltar
          </button>

          <div className="task-details-header">
            <div>
              <p className="page-eyebrow">TAREFA</p>
              <h1>{task.title}</h1>
              <p>Detalhes e informações da tarefa.</p>
            </div>

            <div className="task-details-actions">
              <button
                type="button"
                className="task-edit-button"
                onClick={() =>
                  navigate(`/tarefas/${id}/editar`)
                }
              >
                <EditIcon />
                Editar
              </button>

              <button
                type="button"
                className="task-delete-button"
                onClick={handleDelete}
              >
                <TrashIcon />
                Excluir
              </button>
            </div>
          </div>

          <section className="task-details-grid">
            <div className="task-details-main-card">
              <div className="task-status-row">
                <span className="task-status-badge">
                  <span className="task-status-dot" />
                  {getStateLabel(task.state)}
                </span>

                <span className="task-priority-badge">
                  <FlagIcon />
                  {getPriorityLabel(task.priority)}
                </span>
              </div>

              <div className="task-description-section">
                <h2>Descrição</h2>

                <p>
                  {task.description ||
                    "Nenhuma descrição foi adicionada."}
                </p>
              </div>

              <div className="task-info-grid">
                <div className="task-info-item">
                  <div className="task-info-icon">
                    <CalendarIcon />
                  </div>

                  <div>
                    <span>Data de entrega</span>

                    <strong>
                      {formatDate(task.due_date)}
                    </strong>
                  </div>
                </div>

                <div className="task-info-item">
                  <div className="task-info-icon">
                    <TagIcon />
                  </div>

                  <div>
                    <span>Categoria</span>

                    <strong>
                      {task.category || "Sem categoria"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="task-progress-section">
                <div className="task-progress-header">
                  <span>Progresso</span>

                  <strong>
                    {isCompleted ? "100%" : "0%"}
                  </strong>
                </div>

                <div className="task-progress-bar">
                  <span
                    style={{
                      width: isCompleted ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>

              {actionError && (
                <div className="task-action-error">
                  {actionError}
                </div>
              )}

              <div className="task-complete-section">
                <button
                  type="button"
                  className="complete-task-button"
                  onClick={handleComplete}
                  disabled={actionLoading}
                >
                  <CheckIcon />

                  {actionLoading
                    ? "Atualizando..."
                    : isCompleted
                      ? "Reabrir tarefa"
                      : "Marcar como concluída"}
                </button>
              </div>
            </div>

            <aside className="task-details-side-card">
              <h2>Informações</h2>

              <div className="task-side-item">
                <span>Criada em</span>
                <strong>Informação do banco</strong>
              </div>

              <div className="task-side-item">
                <span>Última atualização</span>
                <strong>Informação do banco</strong>
              </div>

              <div className="task-side-item">
                <span>Status</span>

                <strong>
                  {getStateLabel(task.state)}
                </strong>
              </div>

              <div className="task-side-item">
                <span>ID da tarefa</span>
                <strong>#{task.id}</strong>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  )
}

export default DetalhesTarefa