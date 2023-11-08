import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getTraces = async () => {
  const { data } = await api.get('/traces');
  return data;
};

export const getTrace = async (traceId: string) => {
  const { data } = await api.get(`/traces/${traceId}`);
  return data;
};

export const deleteTrace = async (traceId: string) => {
  await api.delete(`/traces/${traceId}`);
};
