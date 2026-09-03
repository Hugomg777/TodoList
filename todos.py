from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from database import get_session
from models import Todo, User
from schemas import TodoCreate, TodoUpdate, TodoPublic
from security import get_current_user

router = APIRouter(prefix="/todos", tags=["todos"])

Session = Annotated[AsyncSession, Depends(get_session)]


@router.post("/", response_model=TodoPublic)
async def create_todo(
    todo: TodoCreate,
    session: Session,
    user: User = Depends(get_current_user)
):
    db_todo = Todo(
        title=todo.title,
        description=todo.description,
        state=todo.state,
        user_id=user.id
    )

    session.add(db_todo)

    await session.commit()
    await session.refresh(db_todo)

    return db_todo


@router.get("/", response_model=list[TodoPublic])
async def list_todos(
    session: Session,
    user: User = Depends(get_current_user)
):
    result = await session.execute(
        select(Todo).where(
            Todo.user_id == user.id
        )
    )

    return result.scalars().all()


@router.patch("/{todo_id}", response_model=TodoPublic)
async def update_todo(
    todo_id: int,
    todo: TodoUpdate,
    session: Session,
    user: User = Depends(get_current_user)
):
    result = await session.execute(
        select(Todo).where(
            Todo.id == todo_id,
            Todo.user_id == user.id
        )
    )

    db_todo = result.scalar_one_or_none()

    if not db_todo:
        raise HTTPException(
            status_code=404,
            detail="Todo não encontrado"
        )

    for key, value in todo.model_dump(
        exclude_unset=True
    ).items():
        setattr(db_todo, key, value)

    await session.commit()
    await session.refresh(db_todo)

    return db_todo


@router.delete("/{todo_id}", response_model=TodoPublic)
async def delete_todo(
    todo_id: int,
    session: Session,
    user: User = Depends(get_current_user)
):
    result = await session.execute(
        select(Todo).where(
            Todo.id == todo_id,
            Todo.user_id == user.id
        )
    )

    db_todo = result.scalar_one_or_none()

    if not db_todo:
        raise HTTPException(
            status_code=404,
            detail="Todo não encontrado"
        )

    await session.delete(db_todo)
    await session.commit()

    return db_todo