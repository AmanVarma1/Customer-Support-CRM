from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import (
    TicketCreate,
    TicketResponse,
    TicketUpdate,
    TicketDetailResponse,
    TicketUpdateResponse
)
from  .. import crud


router = APIRouter(
    prefix="/api/tickets",
    tags=["tickets"]
)

## GET Tickets
@router.get("/",
            response_model=list[TicketResponse])
def get_tickets(
    status : str | None = None,
    search : str | None = None,
    db : Session = Depends(get_db)
):
    return crud.get_tickets(
        db=db,
        status=status,
        search=search
    )

## Creating Ticket..
@router.post("/",
             response_model=TicketResponse,
             status_code=201)
def ticketCreate(
    ticket_data : TicketCreate,
    db : Session = Depends(get_db)
):
    return crud.create_ticket(db, ticket_data)


## Get Ticket using ticket_id
@router.get("/{ticket_id}",
            response_model=TicketDetailResponse)
def detail_ticket_response(
    ticket_id : str,
    db : Session = Depends(get_db)
):
    ticket = crud.get_ticket(
        db=db,
        ticket_id=ticket_id
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found."
        )
    return ticket


## Updating the ticket
@router.put("/{ticket_id}",
            response_model=TicketUpdateResponse)
def ticket_update(
    ticket_id : str,
    ticket_data : TicketUpdate,
    db : Session = Depends(get_db)
):
    ticket = crud.update_ticket(
        db=db,
        ticket_id=ticket_id,
        ticket_data=ticket_data
    )
    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )
    return {
        "success": True,
        "updated_at": ticket.updated_at
    }

## Delete Ticket
@router.delete("/{ticket_id}")
def delete_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    deleted = crud.delete_ticket(
        db=db,
        ticket_id=ticket_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return {
        "success": True,
        "message": "Ticket deleted successfully"
    }