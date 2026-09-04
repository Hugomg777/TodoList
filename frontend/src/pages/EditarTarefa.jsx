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

function EditarTarefa() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <main className="new-task-content">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(`/tarefas/${id}`)}
          >
            <ArrowLeftIcon />
            Voltar
          </button>

          <div className="new-task-header">
            <div>
              <p className="page-eyebrow">TAREFAS</p>
              <h1>Editar tarefa</h1>
              <p>Atualize as informações da sua tarefa.</p>
            </div>
          </div>

          <section className="new-task-card">
            <form className="new-task-form">
              <div className="form-field form-field-full">
                <label htmlFor="task-title">Título da tarefa</label>
                <input
                  id="task-title"
                  type="text"
                  defaultValue="Finalizar documentação do projeto"
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="task-description">Descrição</label>
                <textarea
                  id="task-description"
                  defaultValue="Finalizar a documentação do projeto integrador e revisar todas as informações antes da entrega."
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="task-date">Data de entrega</label>
                  <div className="form-input-icon">
                    <CalendarIcon />
                    <input
                      id="task-date"
                      type="date"
                      defaultValue="2026-09-10"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="task-category">Categoria</label>
                  <div className="form-input-icon">
                    <TagIcon />
                    <select id="task-category" defaultValue="projeto">
                      <option value="" disabled>
                        Selecione uma categoria
                      </option>
                      <option value="trabalho">Trabalho</option>
                      <option value="estudos">Estudos</option>
                      <option value="pessoal">Pessoal</option>
                      <option value="projeto">Projeto</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-field form-field-full">
                <label>Prioridade</label>

                <div className="priority-options">
                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="baixa"
                    />
                    <span className="priority-dot priority-dot-low"></span>
                    <span>Baixa</span>
                  </label>

                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="media"
                      defaultChecked
                    />
                    <span className="priority-dot priority-dot-medium"></span>
                    <span>Média</span>
                  </label>

                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="alta"
                    />
                    <span className="priority-dot priority-dot-high"></span>
                    <span>Alta</span>
                  </label>
                </div>
              </div>

              <div className="new-task-form-footer">
                <button
                  type="button"
                  className="cancel-task-button"
                  onClick={() => navigate(`/tarefas/${id}`)}
                >
                  Cancelar
                </button>

                <button type="submit" className="save-task-button">
                  <FlagIcon />
                  Salvar alterações
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}

export default EditarTarefa