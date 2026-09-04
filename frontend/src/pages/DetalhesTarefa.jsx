import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

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
              <h1>Finalizar documentação do projeto</h1>
              <p>Detalhes e informações da tarefa.</p>
            </div>

            <div className="task-details-actions">
              <button
                type="button"
                className="task-edit-button"
                onClick={() => navigate(`/tarefas/${id}/editar`)}
              >
                <EditIcon />
                Editar
              </button>

              <button type="button" className="task-delete-button">
                <TrashIcon />
                Excluir
              </button>
            </div>
          </div>

          <section className="task-details-grid">
            <div className="task-details-main-card">
              <div className="task-status-row">
                <span className="task-status-badge">
                  <span className="task-status-dot"></span>
                  Em andamento
                </span>

                <span className="task-priority-badge">
                  <FlagIcon />
                  Média
                </span>
              </div>

              <div className="task-description-section">
                <h2>Descrição</h2>
                <p>
                  Finalizar a documentação do projeto integrador e revisar
                  todas as informações antes da entrega. Verificar se todos
                  os requisitos foram documentados corretamente e organizar
                  os arquivos necessários.
                </p>
              </div>

              <div className="task-info-grid">
                <div className="task-info-item">
                  <div className="task-info-icon">
                    <CalendarIcon />
                  </div>

                  <div>
                    <span>Data de entrega</span>
                    <strong>10 de setembro de 2026</strong>
                  </div>
                </div>

                <div className="task-info-item">
                  <div className="task-info-icon">
                    <TagIcon />
                  </div>

                  <div>
                    <span>Categoria</span>
                    <strong>Projeto</strong>
                  </div>
                </div>
              </div>

              <div className="task-progress-section">
                <div className="task-progress-header">
                  <span>Progresso</span>
                  <strong>60%</strong>
                </div>

                <div className="task-progress-bar">
                  <span></span>
                </div>
              </div>

              <div className="task-complete-section">
                <button type="button" className="complete-task-button">
                  <CheckIcon />
                  Marcar como concluída
                </button>
              </div>
            </div>

            <aside className="task-details-side-card">
              <h2>Informações</h2>

              <div className="task-side-item">
                <span>Criada em</span>
                <strong>02 de setembro de 2026</strong>
              </div>

              <div className="task-side-item">
                <span>Última atualização</span>
                <strong>03 de setembro de 2026</strong>
              </div>

              <div className="task-side-item">
                <span>Status</span>
                <strong>Em andamento</strong>
              </div>

              <div className="task-side-item">
                <span>ID da tarefa</span>
                <strong>#{id}</strong>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  )
}

export default DetalhesTarefa