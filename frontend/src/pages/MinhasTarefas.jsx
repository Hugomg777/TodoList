import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { getTodos } from "../services/api"

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-8 1 1-4Z" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
  open,
  onToggle,
}) {
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const [menuStyle, setMenuStyle] = useState({})

  function updatePosition() {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const width = Math.max(rect.width, 150)

    const left = Math.min(
      rect.left,
      window.innerWidth - width - 12
    )

    setMenuStyle({
      position: "fixed",
      top: `${rect.bottom + 7}px`,
      left: `${Math.max(12, left)}px`,
      width: `${width}px`,
    })
  }

  useLayoutEffect(() => {
    if (!open) return

    updatePosition()

    function handlePositionUpdate() {
      updatePosition()
    }

    window.addEventListener("resize", handlePositionUpdate)
    window.addEventListener("scroll", handlePositionUpdate, true)

    return () => {
      window.removeEventListener("resize", handlePositionUpdate)
      window.removeEventListener("scroll", handlePositionUpdate, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event) {
      const clickedTrigger = triggerRef.current?.contains(event.target)
      const clickedMenu = menuRef.current?.contains(event.target)

      if (!clickedTrigger && !clickedMenu) {
        onToggle()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onToggle])

  const selectedOption =
    options.find(option => option.value === value) || options[0]

  return (
    <div className="tasks-filter">
      <span className="tasks-filter-label">{label}</span>

      <div className="tasks-filter-dropdown">
        <button
          ref={triggerRef}
          type="button"
          className={`tasks-filter-trigger ${open ? "open" : ""}`}
          onClick={onToggle}
        >
          <span>{selectedOption.label}</span>
          <ChevronDownIcon />
        </button>

        {open &&
          createPortal(
            <div
              ref={menuRef}
              className="tasks-filter-menu"
              style={menuStyle}
            >
              {options.map((option, index) => (
                <button
                  type="button"
                  key={option.value}
                  className={`tasks-filter-option ${
                    option.value === value ? "selected" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 45}ms`,
                  }}
                  onClick={() => {
                    onChange(option.value)
                    onToggle()
                  }}
                >
                  <span>{option.label}</span>

                  {option.value === value && (
                    <span className="tasks-filter-check">✓</span>
                  )}
                </button>
              ))}
            </div>,
            document.body
          )}
      </div>
    </div>
  )
}

function MinhasTarefas() {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [priorityFilter, setPriorityFilter] = useState("todas")
  const [openFilter, setOpenFilter] = useState(null)

  useEffect(() => {
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
      } catch (err) {
        if (err.message === "Could not validate credentials") {
          localStorage.removeItem("access_token")
          localStorage.removeItem("token")
          navigate("/login")
          return
        }

        setError(err.message || "Erro ao carregar as tarefas.")
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [navigate])

  const filteredTasks = tasks.filter(task => {
    const matchesStatus =
      statusFilter === "todos" || task.state === statusFilter

    const matchesPriority =
      priorityFilter === "todas" || task.priority === priorityFilter

    return matchesStatus && matchesPriority
  })

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "a fazer", label: "A fazer" },
    { value: "fazendo", label: "Em andamento" },
    { value: "concluído", label: "Concluídas" },
    { value: "rascunho", label: "Rascunho" },
    { value: "lixeira", label: "Lixeira" },
  ]

  const priorityOptions = [
    { value: "todas", label: "Todas" },
    { value: "alta", label: "Alta" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ]

  function formatDate(date) {
    if (!date) {
      return "Sem prazo"
    }

    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  }

  function getStatusLabel(state) {
    const labels = {
      rascunho: "Rascunho",
      "a fazer": "A fazer",
      fazendo: "Em andamento",
      concluído: "Concluída",
      lixeira: "Lixeira",
    }

    return labels[state] || state
  }

  function getPriorityLabel(priority) {
    const labels = {
      baixa: "Baixa",
      media: "Média",
      alta: "Alta",
    }

    return labels[priority] || priority
  }

  function getPriorityClass(priority) {
    if (priority === "alta") return "priority-high"
    if (priority === "media") return "priority-medium"
    return "priority-low"
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-eyebrow">TAREFAS</p>

              <h1>Minhas tarefas</h1>

              <p>
                Visualize e organize todas as suas tarefas.
              </p>
            </div>

            <button
              className="dashboard-new-task"
              type="button"
              onClick={() => navigate("/tarefas/nova")}
            >
              <PlusIcon />
              Nova tarefa
            </button>
          </section>

          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div>
                <h2>Todas as tarefas</h2>

                <p>
                  {filteredTasks.length}{" "}
                  {filteredTasks.length === 1
                    ? "tarefa encontrada"
                    : "tarefas encontradas"}
                  .
                </p>
              </div>

              <div className="tasks-filters">
                <FilterDropdown
                  label="Status"
                  value={statusFilter}
                  options={statusOptions}
                  onChange={setStatusFilter}
                  open={openFilter === "status"}
                  onToggle={() =>
                    setOpenFilter(
                      openFilter === "status" ? null : "status"
                    )
                  }
                />

                <FilterDropdown
                  label="Prioridade"
                  value={priorityFilter}
                  options={priorityOptions}
                  onChange={setPriorityFilter}
                  open={openFilter === "priority"}
                  onToggle={() =>
                    setOpenFilter(
                      openFilter === "priority" ? null : "priority"
                    )
                  }
                />
              </div>
            </div>

            {loading && (
              <div className="dashboard-empty">
                <p>Carregando tarefas...</p>
              </div>
            )}

            {!loading && error && (
              <div className="dashboard-empty">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filteredTasks.length === 0 && (
              <div className="dashboard-empty">
                <p>
                  {tasks.length === 0
                    ? "Você ainda não possui tarefas."
                    : "Nenhuma tarefa corresponde aos filtros selecionados."}
                </p>

                {tasks.length === 0 && (
                  <button
                    type="button"
                    onClick={() => navigate("/tarefas/nova")}
                  >
                    Criar primeira tarefa
                  </button>
                )}
              </div>
            )}

            {!loading && !error && filteredTasks.length > 0 && (
              <div className="dashboard-task-list">
                {filteredTasks.map(task => (
                  <article
                    className="dashboard-task"
                    key={task.id}
                    onClick={() => navigate(`/tarefas/${task.id}`)}
                  >
                    <div
                      className={`dashboard-task-check ${
                        task.state === "concluído" ? "completed" : ""
                      }`}
                    >
                      {task.state === "concluído" && "✓"}
                    </div>

                    <div
                      className={`dashboard-task-info ${
                        task.state === "concluído"
                          ? "completed-task"
                          : ""
                      }`}
                    >
                      <h3>{task.title}</h3>

                      <span>
                        {task.category || "Sem categoria"}
                      </span>
                    </div>

                    <span
                      className={`task-priority ${getPriorityClass(
                        task.priority
                      )}`}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>

                    <span className="task-date">
                      {task.state === "concluído"
                        ? "Concluída"
                        : formatDate(task.due_date)}
                    </span>

                    <span className="task-status-text">
                      {getStatusLabel(task.state)}
                    </span>

                    <button
                      type="button"
                      className="task-edit-button"
                      onClick={event => {
                        event.stopPropagation()
                        navigate(`/tarefas/${task.id}/editar`)
                      }}
                      aria-label={`Editar ${task.title}`}
                    >
                      <EditIcon />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default MinhasTarefas