from sqlalchemy import String, Text, DateTime, Integer, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.sql import func

from .database import Base

## Ticket Table
class Ticket(Base):
    __tablename__="tickets"

    id : Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )
    ticket_id : Mapped[str] = mapped_column(
        String(20),
        unique=True,
        index=True
    )

    customer_name : Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )
    customer_email : Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    subject : Mapped[str] = mapped_column(
        String(50),
        nullable = False
    )
    description : Mapped[str] = mapped_column(
        Text,
        nullable = False
    )

    status : Mapped[str] = mapped_column(
        String(20),
        default="Open",
        nullable=False
    )

    created_at : Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )
    updated_at : Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

## Notes Table
class Note(Base):
    __tablename__ = "notes"

    id : Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )
    ticket_id : Mapped[str] = mapped_column(
        String(20),
        ForeignKey("tickets.ticket_id"),
        nullable=False
    )

    note_text : Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
    created_at : Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )
