import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { createTodo } from "../services/api"

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
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13 13 20l-9-9V4h7l9 9Z" />
      <circle cx="8" cy="8" r="1" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V4" />
      <path d="M5 4c4-3 7 3 14 0v10c-7 3-10-3-14 0" />
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

function NovaTarefa() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [priority, setPriority] = useState("media")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: "trabalho", label: "Trabalho" },
    { value: "estudos", label: "Estudos" },
    { value: "pessoal", label: "Pessoal" },
    { value: "projeto", label: "Projeto" },
  ]

  const selectedCategory = categories.find(
    item => item.value === category
  )

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

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

    setLoading(true)

    try {
      await createTodo({
        title: title.trim(),
        description: description.trim() || null,
        state: "a fazer",
        priority,
        category: category || null,
        due_date: dueDate || null,
      })

      navigate("/dashboard")
    } catch (err) {
      if (err.message === "Could not validate credentials") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      setError(err.message || "Não foi possível criar a tarefa.")
    } finally {
      setLoading(false)
    }
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
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeftIcon />
            Voltar
          </button>

          <div className="new-task-header">
            <div>
              <p className="page-eyebrow">TAREFAS</p>
              <h1>Nova tarefa</h1>
              <p>
                Crie uma nova tarefa e mantenha sua rotina organizada.
              </p>
            </div>
          </div>

          <section className="new-task-card">
            <form
              className="new-task-form"
              onSubmit={handleSubmit}
            >
              <div className="form-field form-field-full">
                <label htmlFor="task-title">Título da tarefa</label>

                <input
                  id="task-title"
                  type="text"
                  placeholder="Ex: Finalizar documentação do projeto"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="task-description">Descrição</label>

                <textarea
                  id="task-description"
                  placeholder="Adicione mais detalhes sobre esta tarefa..."
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="task-date">Data de entrega</label>

                  <div className="form-input-icon">
                    <CalendarIcon />

                    <input
                      id="task-date"
                      type="date"
                      value={dueDate}
                      onChange={event => setDueDate(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Categoria</label>

                  <div className="category-dropdown">
                    <button
                      type="button"
                      className={`category-dropdown-trigger ${
                        categoryOpen ? "open" : ""
                      }`}
                      onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                      <span className="category-trigger-content">
                        <TagIcon />

                        <span className={category ? "selected" : ""}>
                          {selectedCategory?.label ||
                            "Selecione uma categoria"}
                        </span>
                      </span>

                      <ChevronDownIcon />
                    </button>

                    {categoryOpen && (
                      <div className="category-dropdown-menu">
                        {categories.map((item, index) => (
                          <button
                            type="button"
                            key={item.value}
                            className={`category-dropdown-option ${
                              category === item.value ? "selected" : ""
                            }`}
                            style={{
                              animationDelay: `${index * 45}ms`,
                            }}
                            onClick={() => {
                              setCategory(item.value)
                              setCategoryOpen(false)
                            }}
                          >
                            <span>{item.label}</span>

                            {category === item.value && (
                              <span className="category-check">
                                ✓
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
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

              {error && (
                <p className="register-error">
                  {error}
                </p>
              )}

              <div className="new-task-form-footer">
                <button
                  type="button"
                  className="cancel-task-button"
                  onClick={() => navigate("/dashboard")}
                  disabled={loading}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="save-task-button"
                  disabled={loading}
                >
                  <FlagIcon />
                  {loading ? "Criando..." : "Criar tarefa"}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}

export default NovaTarefa