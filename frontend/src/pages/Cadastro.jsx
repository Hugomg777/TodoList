import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../services/api"

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function Cadastro() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegister(event) {
    event.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (!terms) {
      setError("Você precisa concordar com os Termos de Uso e a Política de Privacidade.")
      return
    }

    setLoading(true)

    try {
      await createUser({
        username: name,
        email,
        password
      })

      navigate("/login")
    } catch (error) {
      if (error.message === "Username já está em uso") {
        setError("Este usuário já está em uso.")
      } else if (error.message === "Email já está em uso") {
        setError("Este e-mail já está cadastrado.")
      } else {
        setError(error.message || "Não foi possível criar sua conta.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <img className="register-logo" src="/nexo-logo.png" alt="NEXO" />

        <header className="register-header">
          <h1>Crie sua conta</h1>
          <p>Comece a organizar suas tarefas de forma simples e eficiente.</p>
        </header>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-group">
            <label htmlFor="name">Nome completo</label>

            <div className="register-input-wrapper">
              <UserIcon />

              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="register-group">
            <label htmlFor="register-email">E-mail</label>

            <div className="register-input-wrapper">
              <MailIcon />

              <input
                id="register-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="register-group">
            <label htmlFor="register-password">Senha</label>

            <div className="register-input-wrapper">
              <LockIcon />

              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Crie uma senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon hidden={!showPassword} />
              </button>
            </div>
          </div>

          <div className="register-group">
            <label htmlFor="confirm-password">Confirmar senha</label>

            <div className="register-input-wrapper">
              <LockIcon />

              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita sua senha"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <EyeIcon hidden={!showConfirmPassword} />
              </button>
            </div>
          </div>

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          <label className="register-terms">
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
            />

            <span>
              Concordo com os <button type="button">Termos de Uso</button> e a{" "}
              <button type="button">Política de Privacidade</button>.
            </span>
          </label>

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar minha conta"}
            <ArrowIcon />
          </button>
        </form>

        <div className="register-divider">
          <span></span>
          <p>ou</p>
          <span></span>
        </div>

        <div className="already-account">
          <p>Já possui uma conta?</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Entrar na conta
          </button>
        </div>
      </section>
    </main>
  )
}

export default Cadastro