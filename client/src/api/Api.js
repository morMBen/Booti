import axios from 'axios';

let url = 'http://localhost:8000/api';

if (process.env.NODE_ENV === 'production') {
  url = 'api';
}
const API = axios.create({
  baseURL: url,
});
export default API;
