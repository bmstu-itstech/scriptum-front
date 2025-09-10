import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  withCredentials: true, // важно
  headers: {
    Authorization:
      // admin
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4Mzk4NDc0MTYsInVzZXJfaWQiOjF9.UEx85Sk1ZlsF_QzCpRC9uYe_pKPNiLUOkm8ZuVt61_k',
    // user
    //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4Mzk4NDc0MTYsInVzZXJfaWQiOjJ9.ytwRkTI38hHQyctxSanWiTksh8cktVPF22K1h3vXsy0',
  },
});

// client.interceptors.request.use((config) => {
//   if (typeof document !== 'undefined') {
//     const cookieValue = document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('csrftoken='))
//       ?.split('=')[1];

//     console.log('[Axios] Cookie:', cookieValue);

//     if (cookieValue) {
//       config.headers['Authorization'] = `Bearer ${cookieValue}`;
//     }
//   }

// return config;
// });
