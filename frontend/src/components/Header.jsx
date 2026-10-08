import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../services/api"

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
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSearch(params.get("busca") || "")
  }, [location.search])

  useEffect(() => {
    async function loadUser() {
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        const data = await getCurrentUser()
        setUser(data)
      } catch {
        localStorage.removeItem("access_token")
        localStorage.removeItem("token")
        navigate("/login")
      }
    }

    loadUser()
  }, [navigate])

  function handleSearch(event) {
    event.preventDefault()

    const value = search.trim()

    if (!value) {
      navigate("/tarefas")
      return
    }

    navigate(`/tarefas?busca=${encodeURIComponent(value)}`)
  }

  const username = user?.username || "Usuário"
  const initial = username.charAt(0).toUpperCase()

  return (
    <header className="header">
      <form className="header-search" onSubmit={handleSearch}>
        <SearchIcon />

        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          type="submit"
          className="header-shortcut"
          aria-label="Buscar tarefas"
        >
          ⌘ K
        </button>
      </form>

      <div className="header-actions">
        <button
          className="header-notifications"
          type="button"
        >
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
            {initial}
          </div>

          <div className="header-user-info">
            <strong>{username}</strong>
            <span>Minha conta</span>
          </div>

          <ChevronDownIcon />
        </button>
      </div>
    </header>
  )
}

export default Header