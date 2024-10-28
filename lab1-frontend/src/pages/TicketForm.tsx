import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { generateTicket } from '../services/apiService';

const GenerateTicketPage = () => {
  const [vatin, setVatin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      

      // Call the API with the token
      const ticket = await generateTicket(vatin, firstName, lastName);
      setQrCode(ticket.qrCodeUrl);
      setError('');
    } catch (error: any) {
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
