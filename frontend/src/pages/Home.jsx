import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TicketTable from "../components/TicketTable";
import { getTickets } from "../api/tickets";

function Home() {
    const [tickets, setTickets] = useState([]);
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadTickets() {
        try {
            setLoading(true);
            setError("");

            const data = await getTickets(
                status,
                search
            );

            setTickets(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTickets();
    }, [status, search]);

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>Support Tickets</h1>
                    <p>
                        Manage and track customer support requests.
                    </p>
                </div>

                <Link
                    to="/create"
                    className="primary-button"
                >
                    + Create Ticket
                </Link>

            </div>


            <div className="filters">

                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <select
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value)
                    }
                >
                    <option value="">
                        All Status
                    </option>

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


            {loading && (
                <p className="loading">
                    Loading tickets...
                </p>
            )}


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {!loading && !error && (
                <TicketTable tickets={tickets} />
            )}

        </div>
    );
}

export default Home;