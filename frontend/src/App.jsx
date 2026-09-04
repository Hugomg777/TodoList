import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Dashboard from "./pages/Dashboard"
import NovaTarefa from "./pages/NovaTarefa"
import EditarTarefa from "./pages/EditarTarefa"
import DetalhesTarefa from "./pages/DetalhesTarefa"
import Kanban from "./pages/Kanban"
import Configuracoes from "./pages/Configuracoes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tarefas/nova" element={<NovaTarefa />} />
        <Route path="/tarefas/:id/editar" element={<EditarTarefa />} />
        <Route path="/tarefas/:id" element={<DetalhesTarefa />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App