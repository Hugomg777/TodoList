from datetime import datetime
from enum import Enum

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import (
    Mapped,
    mapped_as_dataclass,
    mapped_column,
    relationship,
)

from database import Base


class TodoState(str, Enum):
    draft = "rascunho"
    todo = "a fazer"
    doing = "fazendo"
    done = "concluído"
    trash = "lixeira"


@mapped_as_dataclass(Base.registry)
class User:
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        init=False,
        primary_key=True
    )

    username: Mapped[str] = mapped_column(
        unique=True
    )

    email: Mapped[str] = mapped_column(
        unique=True
    )

    hashed_password: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(
        init=False,
        server_default=func.now()
    )

    todos: Mapped[list["Todo"]] = relationship(
        init=False,
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


@mapped_as_dataclass(Base.registry)
class Todo:
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(
        init=False,
        primary_key=True
    )

    title: Mapped[str]

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    description: Mapped[str | None] = None

    state: Mapped[TodoState] = mapped_column(
        default=TodoState.todo
    )

    user: Mapped[User] = relationship(
        init=False,
        back_populates="todos"
    )