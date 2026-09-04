import { useState } from "react"
import { useNavigate } from "react-router-dom"

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function EyeIcon({ hidden }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c5 0 8.7 4.1 9.8 6a11.5 11.5 0 0 1-3.2 3.7" />
      <path d="M6.6 6.6C4.1 8.1 2.7 10.3 2.2 12c.9 2.1 3.7 5.3 8 6.1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.2 12s3.5-6 9.8-6 9.8 6 9.8 6-3.5 6-9.8 6-9.8-6-9.8-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="login-page">
      <section className="login-card">
        <img className="login-logo" src="/nexo-logo.png" alt="NEXO" />

        <div className="login-header">
          <h1>Bem-vindo de volta!</h1>
          <p>Entre na sua conta para continuar organizando suas tarefas.</p>
        </div>

        <form className="login-form">
          <div className="login-group">
            <label htmlFor="email">E-mail</label>

            <div className="login-input-wrapper">
              <MailIcon />

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="login-group">
            <label htmlFor="password">Senha</label>

            <div className="login-input-wrapper">
              <LockIcon />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon hidden={!showPassword} />
              </button>
            </div>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              <span>Lembrar de mim</span>
            </label>

            <button type="button">
              Esqueceu a senha?
            </button>
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <div className="login-divider">
          <span></span>
          <p>ou</p>
          <span></span>
        </div>

        <div className="login-register">
          <p>Ainda não tem uma conta?</p>

          <button
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Criar conta
          </button>
        </div>
      </section>
    </main>
  )
}

export default Login