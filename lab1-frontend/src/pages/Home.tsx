// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { fetchTicketCount } from '../services/apiService'; // Import the API function
import './styles/Home.css'; // Add this line at the top of the file

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const ticketCount = await fetchTicketCount(); // Call the API function
        setCount(ticketCount.count);
      } catch (error) {
        console.error('Error fetching ticket count:', error);
      }
    };
    fetchCount();
  }, []);

  return (
    <div>
      <h1>Welcome to the QR Ticket Generator</h1>
      <p>Total Tickets Generated: {count}</p>
    </div>
  );
};

export default Home;
