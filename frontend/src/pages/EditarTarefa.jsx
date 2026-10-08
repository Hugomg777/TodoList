import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { getTodo, updateTodo } from "../services/api"

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

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("media")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

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

        setTitle(data.title || "")
        setDescription(data.description || "")
        setDueDate(data.due_date || "")
        setCategory(data.category || "")
        setPriority(data.priority || "media")
      } catch (err) {
        if (err.message === "Could not validate credentials") {
          localStorage.removeItem("access_token")
          localStorage.removeItem("token")
          navigate("/login")
          return
        }

        setError(
          err.message || "Não foi possível encontrar esta tarefa."
        )
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id, navigate])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError("Digite um título para a tarefa.")
      return
    }

    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    setSaving(true)
    setError("")

    try {
      await updateTodo(id, {
        title: title.trim(),
        description: description.trim() || null,
        due_date: dueDate || null,
        category: category || null,
        priority,
      })

      navigate(`/tarefas/${id}`)
    } catch (err) {
      if (err.message === "Could not validate credentials") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      setError(
        err.message || "Não foi possível salvar as alterações."
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />

        <div className="app-main">
          <Header />

          <main className="new-task-content">
            <p>Carregando tarefa...</p>
          </main>
        </div>
      </div>
    )
  }

  if (error && !title) {
    return (
      <div className="app-layout">
        <Sidebar />

        <div className="app-main">
          <Header />

          <main className="new-task-content">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeftIcon />
              Voltar
            </button>

            <h1>{error}</h1>
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

              <p>
                Atualize as informações da sua tarefa.
              </p>
            </div>
          </div>

          <section className="new-task-card">
            <form
              className="new-task-form"
              onSubmit={handleSubmit}
            >
              {error && (
                <p className="register-error">
                  {error}
                </p>
              )}

              <div className="form-field form-field-full">
                <label htmlFor="task-title">
                  Título da tarefa
                </label>

                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={event =>
                    setTitle(event.target.value)
                  }
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="task-description">
                  Descrição
                </label>

                <textarea
                  id="task-description"
                  value={description}
                  onChange={event =>
                    setDescription(event.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="task-date">
                    Data de entrega
                  </label>

                  <div className="form-input-icon">
                    <CalendarIcon />

                    <input
                      id="task-date"
                      type="date"
                      value={dueDate}
                      onChange={event =>
                        setDueDate(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="task-category">
                    Categoria
                  </label>

                  <div className="form-input-icon">
                    <TagIcon />

                    <select
                      id="task-category"
                      value={category}
                      onChange={event =>
                        setCategory(event.target.value)
                      }
                    >
                      <option value="">
                        Selecione uma categoria
                      </option>

                      <option value="trabalho">
                        Trabalho
                      </option>

                      <option value="estudos">
                        Estudos
                      </option>

                      <option value="pessoal">
                        Pessoal
                      </option>

                      <option value="projeto">
                        Projeto
                      </option>
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
                      checked={priority === "baixa"}
                      onChange={event =>
                        setPriority(event.target.value)
                      }
                    />

                    <span className="priority-dot priority-dot-low" />

                    <span>Baixa</span>
                  </label>

                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="media"
                      checked={priority === "media"}
                      onChange={event =>
                        setPriority(event.target.value)
                      }
                    />

                    <span className="priority-dot priority-dot-medium" />

                    <span>Média</span>
                  </label>

                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="alta"
                      checked={priority === "alta"}
                      onChange={event =>
                        setPriority(event.target.value)
                      }
                    />

                    <span className="priority-dot priority-dot-high" />

                    <span>Alta</span>
                  </label>
                </div>
              </div>

              <div className="new-task-form-footer">
                <button
                  type="button"
                  className="cancel-task-button"
                  onClick={() =>
                    navigate(`/tarefas/${id}`)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="save-task-button"
                  disabled={saving}
                >
                  <FlagIcon />

                  {saving
                    ? "Salvando..."
                    : "Salvar alterações"}
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