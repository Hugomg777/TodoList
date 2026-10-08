const API_URL = "http://127.0.0.1:8000"

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Erro na requisição.")
  }

  return data
}

export function login(username, password) {
  const formData = new URLSearchParams()
  formData.append("username", username)
  formData.append("password", password)

  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  }).then(async (response) => {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao fazer login.")
    }

    return data
  })
}

export function getCurrentUser() {
  return request("/users/me")
}

export function getTodos() {
  return request("/todos/")
}

export function getTodo(id) {
  return request(`/todos/${id}`)
}

export function createTodo(todo) {
  return request("/todos/", {
    method: "POST",
    body: JSON.stringify(todo),
  })
}

export function updateTodo(id, todo) {
  return request(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  })
}

export function deleteTodo(id) {
  return request(`/todos/${id}`, {
    method: "DELETE",
  })
}

export function createUser(user) {
  return request("/users/", {
    method: "POST",
    body: JSON.stringify(user),
  })
}