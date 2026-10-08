import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../services/api"

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await login(username, password)
      localStorage.setItem("access_token", data.access_token)
      navigate("/dashboard")
    } catch (error) {
      setError(error.message || "Não foi possível entrar.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <img
          className="login-logo"
          src="/nexo-logo.png"
          alt="NEXO"
        />

        <div className="login-card">
          <div className="login-header">
            <h1>Bem-vindo de volta</h1>
            <p>Entre na sua conta para continuar.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-group">
              <label htmlFor="username">Usuário ou e-mail</label>

              <div className="login-input-wrapper">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Digite seu usuário ou e-mail"
                  required
                />
              </div>
            </div>

            <div className="login-group">
              <label htmlFor="password">Senha</label>

              <div className="login-input-wrapper">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="login-footer">
            <span>Não possui uma conta?</span>
            <Link to="/cadastro">Criar conta</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login