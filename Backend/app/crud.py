from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from .models import Ticket, Note
from .schemas import TicketCreate, TicketUpdate
from datetime import datetime


## Creates a ticket
def create_ticket(db: Session, ticket_data : TicketCreate):
    ticket = Ticket(
        ticket_id="TEMP",
        customer_name=ticket_data.customer_name,
        customer_email=ticket_data.customer_email,
        subject=ticket_data.subject,
        description=ticket_data.description,
        status="Open",
    )
    db.add(ticket)
    db.flush()

    # Generate ticket ID using the database ID
    ticket.ticket_id = f"TKT-{ticket.id:03d}"

    # Add activity log
    activity = Note(
        ticket_id=ticket.ticket_id,
        note_text="Ticket created",
    )
    db.add(activity)
    db.commit()
    db.refresh(ticket)
    return ticket


## Get all the tickets
def get_tickets(
    db: Session,
    status: str | None = None,
    search: str | None = None,
):
    statement = select(Ticket)

    if status:
        statement = statement.where(Ticket.status == status)

    if search:
        search_term = f"%{search}%"

        statement = statement.where(
            or_(
                Ticket.ticket_id.ilike(search_term),
                Ticket.customer_name.ilike(search_term),
                Ticket.customer_email.ilike(search_term),
                Ticket.description.ilike(search_term),
            )
        )

    statement = statement.order_by(Ticket.created_at.asc())
    result = db.execute(statement)
    return result.scalars().all()


## Detail Tickets
def get_ticket(db: Session, ticket_id: str):
    statement = (
        select(Ticket)
        .where(Ticket.ticket_id == ticket_id)
    )
    result = db.execute(statement)
    ticket = result.scalar_one_or_none()

    if ticket is None:
        return None

    notes_statement = (
        select(Note)
        .where(Note.ticket_id == ticket_id)
        .order_by(Note.created_at.asc())
    )
    notes_result = db.execute(notes_statement)
    notes = notes_result.scalars().all()

    return {
        "ticket_id":ticket.ticket_id,
        "customer_name": ticket.customer_name,
        "customer_email": ticket.customer_email,
        "subject": ticket.subject,
        "description": ticket.description,
        "status": ticket.status,
        "created_at": ticket.created_at,
        "notes": notes
    }


## Update the existing ticket
def update_ticket(
    db: Session,
    ticket_id: str,
    ticket_data: TicketUpdate
):
    statement = (
        select(Ticket)
        .where(Ticket.ticket_id == ticket_id)
    )

    result = db.execute(statement)
    ticket = result.scalar_one_or_none()

    if ticket is None:
        return None

    old_status = ticket.status
    ticket.status = ticket_data.status
    ticket.updated_at = datetime.now()



    if old_status != ticket_data.status and ticket_data.notes:
        activity_text = (
            f"Status changed from {old_status} "
            f"to {ticket_data.status} — "
            f"{ticket_data.notes}"
        )

    elif old_status != ticket_data.status:
        activity_text = (
            f"Status changed from {old_status} "
            f"to {ticket_data.status}"
        )

    else:
        activity_text = ticket_data.notes

    new_note = Note(
        ticket_id=ticket.ticket_id,
        note_text=activity_text
    )

    db.add(new_note)

    db.commit()
    db.refresh(ticket)
    return ticket


## Delete ticket
def delete_ticket(db: Session, ticket_id: str):

    statement = (
        select(Ticket)
        .where(Ticket.ticket_id == ticket_id)
    )

    result = db.execute(statement)
    ticket = result.scalar_one_or_none()

    if ticket is None:
        return None

    # Delete activity/notes first
    notes_statement = (
        select(Note)
        .where(Note.ticket_id == ticket_id)
    )

    notes_result = db.execute(notes_statement)
    notes = notes_result.scalars().all()

    for note in notes:
        db.delete(note)

    # Delete ticket
    db.delete(ticket)

    db.commit()

    return True



