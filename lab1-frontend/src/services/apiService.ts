import axios from 'axios';

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Default to localhost for local development
});

// Fetch the count of tickets
export const fetchTicketCount = async () => {
  const response = await api.get('/tickets/count');
  return response.data;
};

// Generate a new ticket
export const generateTicket = async (vatin: string, firstName: string, lastName: string) => {
  try {
    const response = await api.post('/tickets/generate', { vatin, firstName, lastName });
    return response.data.ticket; 
  } catch (error: any) {
    throw error; 
  }
};


export const getTicketDetails = async (id: string) => {
  const response = await api.get(`/tickets/${id}`);
  console.log("getTicketDetails", response);
  return response.data.ticket; // Adjust according to your backend response
};

