import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TicketDetail from "../components/TicketDetail";
import {
    getTicket,
    updateTicket,
} from "../api/tickets";

function TicketDetails() {
    const { ticketId } = useParams();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    async function loadTicket() {
        try {
            setLoading(true);
            setError("");

            const data = await getTicket(ticketId);

            setTicket(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTicket();
    }, [ticketId]);

    async function handleUpdate(data) {
        try {
            setUpdating(true);

            await updateTicket(ticketId, data);


            await loadTicket();

        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return (
            <div className="page">
                <p>Loading ticket...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">

                <div className="error-message">
                    {error}
                </div>

                <Link to="/">
                    ← Back to tickets
                </Link>

            </div>
        );
    }

    return (
        <div className="page">

            <Link
                to="/"
                className="back-link"
            >
                ← Back to tickets
            </Link>

            <TicketDetail
                ticket={ticket}
                onUpdate={handleUpdate}
                updating={updating}
            />

        </div>
    );
}

export default TicketDetails;