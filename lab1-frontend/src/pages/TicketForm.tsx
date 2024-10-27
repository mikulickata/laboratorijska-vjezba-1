import React, { useEffect, useState } from 'react';
import { fetchTicketCount, generateTicket, getTicketDetails } from '../services/apiService'

const TicketComponent = () => {
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await fetchTicketCount();
      setTicketCount(count);
    };

    fetchCount();
  }, []);

  const handleGenerateTicket = async () => {
    const ticket = await generateTicket('1234567890', 'John', 'Doe');
    console.log("Generated ticket: ", ticket);
  };

  const handleGetDetails = async (id: string) => {
    const details = await getTicketDetails(id);
    console.log("Ticket details: ", details);
  };

  return (
    <div>
      <h1>Ticket Count: {ticketCount}</h1>
      <button onClick={handleGenerateTicket}>Generate Ticket</button>
      {/* Example: To get ticket details, replace 'your_ticket_id' with an actual ID */}
      <button onClick={() => handleGetDetails('your_ticket_id')}>Get Ticket Details</button>
    </div>
  );
};

export default TicketComponent;
