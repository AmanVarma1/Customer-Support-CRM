const API_URL = `${import.meta.env.VITE_API_URL}/api/tickets/`;

export async function getTickets(status = "", search = "") {
  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (search) {
    params.append("search", search);
  }

  const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

export async function getTicket(ticketId) {
  const response = await fetch(`${API_URL}${ticketId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Ticket not found");
    }

    throw new Error("Failed to fetch ticket");
  }

  return response.json();
}

export async function createTicket(ticketData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create ticket");
  }

  return response.json();
}

export async function updateTicket(ticketId, ticketData) {
  const response = await fetch(`${API_URL}${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update ticket");
  }

  return response.json();
}
