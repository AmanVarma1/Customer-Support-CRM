import { useState } from "react";
import StatusBadge from "./StatusBadge";
import ActivityTimeline from "./ActivityTimeline";

function formatDate(date) {
    if (!date) {
        return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }

    return parsedDate.toLocaleString();
}

function TicketDetail({
    ticket,
    onUpdate,
    updating = false,
}) {
    const [status, setStatus] = useState(ticket.status);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleUpdate(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        try {
            await onUpdate({
                status,
                notes: notes || null,
            });

            setNotes("");
            setSuccess("Ticket updated successfully.");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>

            <div className="ticket-header">
                <div>
                    <p className="ticket-id">
                        {ticket.ticket_id}
                    </p>

                    <h1>{ticket.subject}</h1>
                </div>

                <StatusBadge status={ticket.status} />
            </div>


            <div className="ticket-info-grid">

                <div className="info-card">
                    <h3>Customer</h3>

                    <p>{ticket.customer_name}</p>
                    <p>{ticket.customer_email}</p>
                </div>

                <div className="info-card">
                    <h3>Created</h3>

                    <p>
                        {formatDate(ticket.created_at)}
                    </p>
                </div>

            </div>


            <div className="info-card">
                <h3>Description</h3>

                <p>{ticket.description}</p>
            </div>


            <div className="update-card">

                <h2>Update Ticket</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleUpdate}>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                        >
                            <option value="Open">
                                Open
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Closed">
                                Closed
                            </option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Activity / Note</label>

                        <textarea
                            value={notes}
                            onChange={(event) =>
                                setNotes(event.target.value)
                            }
                            placeholder="Add a note about this update..."
                            rows="4"
                        />
                    </div>


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={updating}
                    >
                        {updating
                            ? "Updating..."
                            : "Update Ticket"}
                    </button>

                </form>

            </div>


            <div className="activity-section">

                <h2>Activity</h2>

                <ActivityTimeline
                    notes={ticket.notes}
                />

            </div>

        </div>
    );
}

export default TicketDetail;