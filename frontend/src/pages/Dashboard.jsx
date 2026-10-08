import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { getCurrentUser, getTodos } from "../services/api"

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 4.3 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loadDashboard = async () => {
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        const userData = await getCurrentUser()
        setUser(userData)

        const tasksData = await getTodos()
        setTasks(tasksData)
      } catch {
        localStorage.removeItem("access_token")
        localStorage.removeItem("token")
        navigate("/login")
      }
    }

    loadDashboard()
  }, [navigate])

  const completedTasks = tasks.filter(
    task => task.state === "concluído"
  )

  const doingTasks = tasks.filter(
    task => task.state === "fazendo"
  )

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const overdueTasks = tasks.filter(task => {
    if (!task.due_date || task.state === "concluído") {
      return false
    }

    const dueDate = new Date(`${task.due_date}T00:00:00`)
    return dueDate < today
  })

  const todayTasks = tasks.filter(task => {
    if (!task.due_date) {
      return false
    }

    const dueDate = new Date(`${task.due_date}T00:00:00`)
    return dueDate.getTime() === today.getTime()
  })

  const getPriorityLabel = priority => {
    if (priority === "alta") return "Alta"
    if (priority === "media") return "Média"
    return "Baixa"
  }

  const getPriorityClass = priority => {
    if (priority === "alta") return "priority-high"
    if (priority === "media") return "priority-medium"
    return "priority-low"
  }

  const formatDate = date => {
    if (!date) {
      return "Sem prazo"
    }

    const taskDate = new Date(`${date}T00:00:00`)

    if (taskDate.getTime() === today.getTime()) {
      return "Hoje"
    }

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (taskDate.getTime() === tomorrow.getTime()) {
      return "Amanhã"
    }

    return taskDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
  }

  const recentTasks = tasks.slice(0, 4)

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-eyebrow">VISÃO GERAL</p>

              <h1>
                Olá, {user?.username || "Usuário"}! 👋
              </h1>

              <p>
                Veja como está sua produtividade hoje.
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

          <section className="dashboard-stats">
            <article className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <CheckIcon />
              </div>

              <div className="stat-info">
                <span>Tarefas concluídas</span>
                <strong>{completedTasks.length}</strong>
                <small>Concluídas</small>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <ClockIcon />
              </div>

              <div className="stat-info">
                <span>Em andamento</span>
                <strong>{doingTasks.length}</strong>
                <small>{todayTasks.length} para hoje</small>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-orange">
                <AlertIcon />
              </div>

              <div className="stat-info">
                <span>Em atraso</span>
                <strong>{overdueTasks.length}</strong>
                <small>Precisa de atenção</small>
              </div>
            </article>
          </section>

          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div>
                <h2>Minhas tarefas</h2>
                <p>Confira suas tarefas mais recentes.</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/kanban")}
              >
                Ver todas
                <ArrowRightIcon />
              </button>
            </div>

            <div className="dashboard-task-list">
              {recentTasks.length === 0 ? (
                <div className="dashboard-empty">
                  <p>Você ainda não possui tarefas.</p>

                  <button
                    type="button"
                    onClick={() => navigate("/tarefas/nova")}
                  >
                    Criar primeira tarefa
                  </button>
                </div>
              ) : (
                recentTasks.map(task => (
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
                      {task.state === "concluído" && (
                        <CheckIcon />
                      )}
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
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="dashboard-bottom">
            <div className="productivity-card">
              <div className="productivity-header">
                <div>
                  <h2>Produtividade</h2>
                  <p>Tarefas concluídas nesta semana</p>
                </div>

                <span>
                  {tasks.length > 0
                    ? `${Math.round(
                        (completedTasks.length / tasks.length) * 100
                      )}%`
                    : "0%"}
                </span>
              </div>

              <div className="productivity-chart">
                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "45%" }}></div>
                  <span>Seg</span>
                </div>

                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "65%" }}></div>
                  <span>Ter</span>
                </div>

                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "52%" }}></div>
                  <span>Qua</span>
                </div>

                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "80%" }}></div>
                  <span>Qui</span>
                </div>

                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "68%" }}></div>
                  <span>Sex</span>
                </div>

                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "35%" }}></div>
                  <span>Sáb</span>
                </div>

                <div className="chart-day">
                  <div className="chart-bar" style={{ height: "25%" }}></div>
                  <span>Dom</span>
                </div>
              </div>
            </div>

            <div className="today-card">
              <div className="today-card-header">
                <div>
                  <h2>Hoje</h2>

                  <p>
                    {today.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>

                <strong>
                  {todayTasks.length}{" "}
                  {todayTasks.length === 1
                    ? "tarefa"
                    : "tarefas"}
                </strong>
              </div>

              <div className="today-progress">
                <div className="today-progress-bar">
                  <span
                    style={{
                      width:
                        todayTasks.length > 0
                          ? `${
                              (todayTasks.filter(
                                task =>
                                  task.state === "concluído"
                              ).length /
                                todayTasks.length) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></span>
                </div>

                <div className="today-progress-info">
                  <span>
                    {
                      todayTasks.filter(
                        task => task.state === "concluído"
                      ).length
                    }{" "}
                    de {todayTasks.length} concluídas
                  </span>

                  <strong>
                    {todayTasks.length > 0
                      ? `${Math.round(
                          (todayTasks.filter(
                            task => task.state === "concluído"
                          ).length /
                            todayTasks.length) *
                            100
                        )}%`
                      : "0%"}
                  </strong>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard