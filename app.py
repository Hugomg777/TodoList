from fastapi import FastAPI
from auth import router as auth_router
from users import router as users_router
from todos import router as todos_router

app = FastAPI(title="Todo API")

@app.get("/")
def read_root():
    return {"message": "Olá Mundo"}

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(todos_router)
