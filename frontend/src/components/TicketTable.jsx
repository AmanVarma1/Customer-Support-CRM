import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function TicketTable({ tickets }) {
    if (tickets.length === 0) {
        return (
            <div className="empty-state">
                <h3>No tickets found</h3>
                <p>Try changing your search or status filter.</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Customer</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.ticket_id}>
                            <td>
                                <Link to={`/tickets/${ticket.ticket_id}`}>
                                    {ticket.ticket_id}
                                </Link>
                            </td>

                            <td>{ticket.customer_name}</td>

                            <td>{ticket.subject}</td>

                            <td>
                                <StatusBadge status={ticket.status} />
                            </td>

                            <td>
                                {new Date(ticket.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketTable;