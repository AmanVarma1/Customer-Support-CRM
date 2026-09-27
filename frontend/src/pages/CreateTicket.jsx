import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TicketForm from "../components/TicketForm";
import { createTicket } from "../api/tickets";

function CreateTicket() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleCreate(formData) {
        try {
            setLoading(true);

            const ticket = await createTicket(formData);

            navigate(`/tickets/${ticket.ticket_id}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page narrow-page">

            <h1>Create Ticket</h1>

            <p className="page-description">
                Create a new customer support ticket.
            </p>

            <TicketForm
                onSubmit={handleCreate}
                loading={loading}
            />

        </div>
    );
}

export default CreateTicket;