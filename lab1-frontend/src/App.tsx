import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update to Routes
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from "./auth0-config";
import HomePage from './pages/HomePage';
import GenerateTicketPage from './pages/GenerateTicketPage';
import TicketDetailsPage from './pages/TicketDetailsPage';

const App: React.FC = () => (
  <Auth0Provider
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={auth0Config.authorizationParams}
  >
    <Router>
      <Routes> {/* Update to Routes */}
        <Route path="/" element={<HomePage />} /> {/* Use element instead of component */}
        <Route path="/generate-ticket" element={<GenerateTicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
      </Routes>
    </Router>
  </Auth0Provider>
);

export default App;
