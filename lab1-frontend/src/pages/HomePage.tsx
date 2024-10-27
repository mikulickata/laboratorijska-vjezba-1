import React, { useEffect, useState } from 'react';
import { fetchTicketCount } from '../services/apiService';

const HomePage = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const getCount = async () => {
      const data = await fetchTicketCount();
      console.log("fetch: ", data.message, data.count)
      setCount(data.count);
    };
    getCount();
  }, []);

  return <div>Broj generiranih ulaznica: {count}</div>;
};

export default HomePage;
