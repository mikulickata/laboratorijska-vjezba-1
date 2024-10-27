import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Backend baza URL
});

export const fetchTicketCount = async () => {
  const response = await api.get('/tickets/count');
  console.log("response: ", response)
  return response.data;
};

export const generateTicket = async (vatin: string, firstName: string, lastName: string) => {
  const response = await axios.post(
    'http://localhost:4000/tickets/generate', // Ensure this matches your backend endpoint
    { vatin, firstName, lastName }
  );
  return response.data.ticket; // Adjust according to your backend response
};




export const getTicketDetails = async (id: string) => {
  const response = await api.get(`http://localhost:4000/tickets/${id}`);
  console.log("getTicketDetails", response)
  return response.data;
};
