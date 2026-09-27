import { useState } from "react";

function TicketForm({ onSubmit, loading = false }) {
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        try {
            await onSubmit(formData);

            setFormData({
                customer_name: "",
                customer_email: "",
                subject: "",
                description: "",
            });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="ticket-form">

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="form-group">
                <label>Customer Name</label>

                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    minLength={2}
                />
            </div>

            <div className="form-group">
                <label>Customer Email</label>

                <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Subject</label>

                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    required
                />
            </div>

            <button
                type="submit"
                className="primary-button"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Ticket"}
            </button>

        </form>
    );
}

export default TicketForm;