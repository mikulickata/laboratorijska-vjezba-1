// src/pages/TicketDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { getTicketDetails } from '../services/apiService'; // Import the API function

interface Ticket {
  vatin: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Make id optional
  const { user } = useAuth0();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      if (id) { // Check if id is defined
        try {
          const ticketData = await getTicketDetails(id); // Call the API function
          setTicket(ticketData);
        } catch (error) {
          console.error('Error fetching ticket details:', error);
        }
      } else {
        console.error('Ticket ID is not defined.');
      }
    };
    fetchTicket();
  }, [id]);

  return (
    <div>
      <h2>Ticket Details</h2>
      {ticket ? (
        <div>
          <p>VATIN: {ticket.vatin}</p>
          <p>First Name: {ticket.firstName}</p>
          <p>Last Name: {ticket.lastName}</p>
          <p>Created At: {ticket.createdAt}</p>
          <p>User: {user?.name}</p>
        </div>
      ) : (
        <p>Loading ticket details...</p>
      )}
    </div>
  );
};

export default TicketDetails;
