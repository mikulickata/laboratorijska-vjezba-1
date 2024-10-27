import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketDetails } from '../services/apiService';
import { useAuth0 } from '@auth0/auth0-react';

const TicketDetailsPage = () => {
  const { id } = useParams<{ id?: string }>(); // Allow id to be undefined
  //const { user, isAuthenticated } = useAuth0();
  const [ticket, setTicket] = useState<any>(null); // Define a more specific type if possible

  useEffect(() => {
    const fetchTicket = async () => {
      if (id) { // Ensure id is defined before fetching
        try {
          const data = await getTicketDetails(id);
          console.log("data: ", data)
          setTicket(data.ticket);
        } catch (error) {
          console.error("Failed to fetch ticket details:", error);
          // Handle error appropriately (e.g., show an error message)
        }
      } else {
        console.error("Ticket ID is undefined");
      }
    };
    fetchTicket();
  }, [id]);

  /*
  if (!isAuthenticated) {
    return <div>Morate biti prijavljeni kako biste vidjeli detalje.</div>;
  }
  */
  return (
    <div>
      <p>Ime korisnika: </p>
      {/* Check if ticket data is available before rendering details */}
      {ticket ? (
        <div>
          <h2>Detalji ulaznice</h2>
          <p>{JSON.stringify(ticket)}</p> {/* Adjust this to display ticket details more nicely */}
        </div>
      ) : (
        <p>Učitavanje detalja ulaznice...</p>
      )}
    </div>
  );
};

export default TicketDetailsPage;
