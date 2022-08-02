import axios from 'axios';

let url = 'http://localhost:80/api';

if (process.env.NODE_ENV === 'production') {
  url = 'api';
}
const API = axios.create({
  baseURL: url,
});
export default API;
