from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from database import get_session
from models import User
from schemas import UserCreate, UserPublic
from security import pwd_context

router = APIRouter(prefix="/users", tags=["users"])

Session = Annotated[AsyncSession, Depends(get_session)]


@router.post("/", response_model=UserPublic)
async def create_user(
    user: UserCreate,
    session: Session
):
    # Verifica se o username já existe
    result = await session.execute(
        select(User).where(User.username == user.username)
    )

    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username já está em uso"
        )

    # Verifica se o email já existe
    result = await session.execute(
        select(User).where(User.email == user.email)
    )

    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email já está em uso"
        )

    # Cria o hash da senha
    hashed_pw = pwd_context.hash(user.password)

    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )

    session.add(db_user)

    await session.commit()
    await session.refresh(db_user)

    return db_user


@router.get("/", response_model=list[UserPublic])
async def list_users(
    session: Session
):
    result = await session.execute(
        select(User)
    )

    return result.scalars().all()