import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Ako planirate koristiti Auth0 za autentifikaciju
import { generateTicket } from '../services/apiService';
import './styles/TicketForm.css'; // Add this line at the top of the file

const GenerateTicketPage = () => {
  const [vatin, setVatin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Resetiranje greške prije slanja
    setError('');

    try {
      // Pozivanje API-ja za generiranje ulaznice
      const ticket = await generateTicket(vatin, firstName, lastName);
      setQrCode(ticket.qrCodeUrl);
    } catch (error: any) {
      // Postavljanje greške u stanju
      setError(error.response?.data?.message || 'Došlo je do pogreške prilikom generiranja ulaznice.');
      console.error('Error generating ticket:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={vatin}
        onChange={(e) => setVatin(e.target.value)}
        placeholder="VATIN"
        required
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <button type="submit">Generate Ticket</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default GenerateTicketPage;
