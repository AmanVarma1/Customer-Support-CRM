from pydantic import BaseModel, ConfigDict, Field, EmailStr
from typing import Literal
from datetime import datetime


TicketStatus = Literal["Open", "In Progress", "Closed"]


## POST
class TicketCreate(BaseModel):
    customer_name : str = Field(min_length=2, max_length=50)
    customer_email : EmailStr
    subject : str = Field(min_length=5, max_length=50)
    description : str = Field(min_length=10, max_length=100)


## GET /tickets
class TicketResponse(BaseModel) :
    ticket_id : str
    customer_name : str
    subject : str
    status : TicketStatus
    created_at : datetime

    model_config = ConfigDict(from_attributes=True)

## Notes and Activity log for Ticket
class NoteResponse(BaseModel):
    id : int
    note_text : str
    created_at : datetime

    model_config=ConfigDict(from_attributes=True)


## Get /tickets/{id}
class TicketDetailResponse(BaseModel):
    ticket_id : str
    customer_name : str
    customer_email : str
    subject : str
    description : str
    status : TicketStatus
    created_at : datetime
    notes : list[NoteResponse]

    model_config=ConfigDict(from_attributes=True)


## Put
class TicketUpdate(BaseModel):
    status : TicketStatus
    notes : str | None = None


class TicketUpdateResponse(BaseModel):
    success: bool
    updated_at: datetime