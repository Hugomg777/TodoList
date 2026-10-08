from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from backend.models.models import TodoState, TodoPriority


class Token(BaseModel):
    access_token: str
    token_type: str


class TodoBase(BaseModel):
    title: str
    description: str | None = None
    state: TodoState | None = None
    priority: TodoPriority | None = None
    category: str | None = None
    due_date: date | None = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    state: TodoState | None = None
    priority: TodoPriority | None = None
    category: str | None = None
    due_date: date | None = None


class TodoPublic(TodoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class FilterPage(BaseModel):
    offset: int = Field(default=0, ge=0)
    limit: int = Field(default=10, ge=0)


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserPublic(BaseModel):
    id: int
    username: str
    email: str

    model_config = ConfigDict(from_attributes=True)