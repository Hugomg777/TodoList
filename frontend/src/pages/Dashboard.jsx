import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

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

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-eyebrow">VISÃO GERAL</p>
              <h1>Olá, Usuário! 👋</h1>
              <p>Veja como está sua produtividade hoje.</p>
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
                <strong>24</strong>
                <small>+12% esta semana</small>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <ClockIcon />
              </div>

              <div className="stat-info">
                <span>Em andamento</span>
                <strong>8</strong>
                <small>3 para hoje</small>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon stat-icon-orange">
                <AlertIcon />
              </div>

              <div className="stat-info">
                <span>Em atraso</span>
                <strong>3</strong>
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
              <article className="dashboard-task">
                <div className="dashboard-task-check"></div>

                <div className="dashboard-task-info">
                  <h3>Finalizar documentação do projeto</h3>
                  <span>Projeto Integrador</span>
                </div>

                <span className="task-priority priority-high">
                  Alta
                </span>

                <span className="task-date">
                  Hoje
                </span>
              </article>

              <article className="dashboard-task">
                <div className="dashboard-task-check"></div>

                <div className="dashboard-task-info">
                  <h3>Revisar metodologia do TCC</h3>
                  <span>TCC</span>
                </div>

                <span className="task-priority priority-medium">
                  Média
                </span>

                <span className="task-date">
                  Amanhã
                </span>
              </article>

              <article className="dashboard-task">
                <div className="dashboard-task-check"></div>

                <div className="dashboard-task-info">
                  <h3>Estudar para avaliação</h3>
                  <span>Faculdade</span>
                </div>

                <span className="task-priority priority-low">
                  Baixa
                </span>

                <span className="task-date">
                  05 Set
                </span>
              </article>

              <article className="dashboard-task">
                <div className="dashboard-task-check completed"></div>

                <div className="dashboard-task-info completed-task">
                  <h3>Organizar arquivos do projeto</h3>
                  <span>Projeto</span>
                </div>

                <span className="task-priority priority-low">
                  Baixa
                </span>

                <span className="task-date">
                  Concluída
                </span>
              </article>
            </div>
          </section>

          <section className="dashboard-bottom">
            <div className="productivity-card">
              <div className="productivity-header">
                <div>
                  <h2>Produtividade</h2>
                  <p>Tarefas concluídas nesta semana</p>
                </div>

                <span>+18%</span>
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
                  <p>Quinta-feira, 4 de setembro</p>
                </div>

                <strong>3 tarefas</strong>
              </div>

              <div className="today-progress">
                <div className="today-progress-bar">
                  <span></span>
                </div>

                <div className="today-progress-info">
                  <span>1 de 3 concluídas</span>
                  <strong>33%</strong>
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