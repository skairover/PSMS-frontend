import api from './api';

export const getMedicines = async () => {
  const res = await api.get('/api/medicines');
  return res.data; 
};

export const createMedicine = async (medicineData) => {
  const res = await api.post('/api/medicines', medicineData);
  return res.data; 
};

export const deleteMedicine = async (id) => {
  const res = await api.delete(`/api/medicines/${id}`);
  return res.data; 
};
