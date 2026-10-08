import asyncio

from sqlalchemy import text

from backend.database import engine


async def migrate():
    async with engine.begin() as conn:
        result = await conn.execute(text("PRAGMA table_info(todos)"))
        columns = [row[1] for row in result.fetchall()]

        if "priority" not in columns:
            await conn.execute(
                text("ALTER TABLE todos ADD COLUMN priority VARCHAR DEFAULT 'medium'")
            )

        if "category" not in columns:
            await conn.execute(
                text("ALTER TABLE todos ADD COLUMN category VARCHAR")
            )

        if "due_date" not in columns:
            await conn.execute(
                text("ALTER TABLE todos ADD COLUMN due_date DATE")
            )


asyncio.run(migrate())