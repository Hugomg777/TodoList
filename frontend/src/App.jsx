import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import "./App.css"

import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Dashboard from "./pages/Dashboard"
import MinhasTarefas from "./pages/MinhasTarefas"
import NovaTarefa from "./pages/NovaTarefa"
import EditarTarefa from "./pages/EditarTarefa"
import DetalhesTarefa from "./pages/DetalhesTarefa"
import Kanban from "./pages/Kanban"
import Configuracoes from "./pages/Configuracoes"

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tarefas"
          element={
            <ProtectedRoute>
              <MinhasTarefas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tarefas/nova"
          element={
            <ProtectedRoute>
              <NovaTarefa />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tarefas/:id/editar"
          element={
            <ProtectedRoute>
              <EditarTarefa />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tarefas/:id"
          element={
            <ProtectedRoute>
              <DetalhesTarefa />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />

        <Route
          path="/configuracoes"
          element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App