import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="navbar-inner">
          <a
            href="/"
            className="logo"
          >
            Support CRM
          </a>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/create"
          element={<CreateTicket />}
        />
        <Route
          path="/tickets/:ticketId"
          element={<TicketDetails />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;