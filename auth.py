from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Annotated

from database import get_session
from models import User
from schemas import Token
from security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

Session = Annotated[AsyncSession, Depends(get_session)]


@router.post("/token", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session
):
    # busca usuário pelo username
    result = await session.execute(
        select(User).where(User.username == form_data.username)
    )

    db_user = result.scalar_one_or_none()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Usuário não encontrado"
        )

    # verifica senha com hash
    if not verify_password(
        form_data.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Senha incorreta"
        )

    # gera token JWT
    access_token = create_access_token({
        "sub": str(db_user.id)
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }