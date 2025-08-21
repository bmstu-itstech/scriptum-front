import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4Mzk4NDc0MTYsInVzZXJfaWQiOjF9.9KCAZz8OHdQhvkrEuPCfYMaCtnqxNTESlShWIbi5hOs',
  },
  withCredentials: true,
});

export { client };
