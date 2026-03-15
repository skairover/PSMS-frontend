import api from './api';

export const getPatients = async () => {
  const res = await api.get('/api/patients');
  return res.data; 
};

export const createPatient = async (patientData) => {
  const res = await api.post('/api/patients', patientData);
  return res.data; 
};

export const deletePatient = async (id) => {
  const res = await api.delete(`/api/patients/${id}`);
  return res.data; 
};
