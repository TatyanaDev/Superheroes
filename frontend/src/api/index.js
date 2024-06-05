import axios from 'axios';
import queryString from 'query-string';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getHeroes = ({ offset, limit }) =>
  httpClient.get(`/supergeroes?${queryString.stringify({ limit, offset })}`);
  
export const createHero = data => httpClient.post('/supergeroes', data);
