import { useNavigate } from "react-router-dom"

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
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

function Header() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Buscar tarefas..."
        />
        <span className="header-shortcut">⌘ K</span>
      </div>

      <div className="header-actions">
        <button className="header-notifications" type="button">
          <BellIcon />
          <span className="notification-dot"></span>
        </button>

        <div className="header-divider"></div>

        <button
          className="header-profile"
          type="button"
          onClick={() => navigate("/configuracoes")}
        >
          <div className="header-avatar">
            U
          </div>

          <div className="header-user-info">
            <strong>Usuário</strong>
            <span>Minha conta</span>
          </div>

          <ChevronDownIcon />
        </button>
      </div>
    </header>
  )
}

export default Header