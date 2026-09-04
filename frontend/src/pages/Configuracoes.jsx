import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

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

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Configuracoes() {
  const navigate = useNavigate()

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <main className="settings-content">
          <div className="settings-header">
            <div>
              <p className="page-eyebrow">PREFERÊNCIAS</p>
              <h1>Configurações</h1>
              <p>Gerencie sua conta e personalize o NEXO.</p>
            </div>
          </div>

          <div className="settings-layout">
            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <UserIcon />
                </div>

                <div>
                  <h2>Perfil</h2>
                  <p>Atualize suas informações pessoais.</p>
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-field">
                  <label htmlFor="settings-name">Nome</label>
                  <input
                    id="settings-name"
                    type="text"
                    defaultValue="Usuário"
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="settings-email">E-mail</label>

                  <div className="settings-input-icon">
                    <MailIcon />
                    <input
                      id="settings-email"
                      type="email"
                      defaultValue="usuario@email.com"
                    />
                  </div>
                </div>

                <button type="button" className="settings-save-button">
                  Salvar alterações
                </button>
              </div>
            </section>

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <LockIcon />
                </div>

                <div>
                  <h2>Segurança</h2>
                  <p>Altere sua senha de acesso.</p>
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-field">
                  <label htmlFor="current-password">Senha atual</label>
                  <input
                    id="current-password"
                    type="password"
                    placeholder="Digite sua senha atual"
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="new-password">Nova senha</label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Digite a nova senha"
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="confirm-password">Confirmar nova senha</label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirme sua nova senha"
                  />
                </div>

                <button type="button" className="settings-outline-button">
                  Alterar senha
                </button>
              </div>
            </section>

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <BellIcon />
                </div>

                <div>
                  <h2>Notificações</h2>
                  <p>Escolha como deseja receber avisos.</p>
                </div>
              </div>

              <div className="settings-options">
                <div className="settings-option">
                  <div>
                    <strong>Lembretes de tarefas</strong>
                    <span>Receba lembretes sobre tarefas próximas do prazo.</span>
                  </div>

                  <label className="settings-switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>

                <div className="settings-option">
                  <div>
                    <strong>Tarefas atrasadas</strong>
                    <span>Seja avisado quando uma tarefa estiver atrasada.</span>
                  </div>

                  <label className="settings-switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>
              </div>
            </section>

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <MoonIcon />
                </div>

                <div>
                  <h2>Aparência</h2>
                  <p>Personalize a aparência do aplicativo.</p>
                </div>
              </div>

              <div className="settings-theme">
                <button type="button" className="settings-theme-select">
                  <span>Modo claro</span>
                  <ChevronIcon />
                </button>
              </div>
            </section>

            <section className="settings-danger-card">
              <div>
                <h2>Zona de perigo</h2>
                <p>
                  A exclusão da conta é permanente e não poderá ser desfeita.
                </p>
              </div>

              <button type="button" className="settings-danger-button">
                Excluir conta
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Configuracoes