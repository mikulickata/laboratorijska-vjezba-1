// src/App.tsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TicketForm from './pages/TicketForm';
import TicketDetails from './pages/TicketDetails';
import { useAuth0 } from '@auth0/auth0-react';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate-ticket" element={<TicketForm />} />
      <Route
        path="/tickets/:id"
        element={isAuthenticated ? <TicketDetails /> : <Navigate to="/tickets/:id" />}
      />
    </Routes>
  );
};

export default App;
