from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.controllers.auth import router as auth_router
from backend.controllers.users import router as users_router
from backend.controllers.todos import router as todos_router

app = FastAPI(title="Todo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Olá Mundo"}

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(todos_router)