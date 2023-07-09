import axios from 'axios';

export const APIfinancialRecord = {
  getRecordList: async () => {
    const response = await axios.get('/data/recordList.json');
    return response.data;
  },
  createFaRec: async (formData) => {
    const response = await axios.post('/api/financial-record/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getFaRec: async (financialRecordId) => {
    const response = await axios.get(
      `/api/financial-record/${financialRecordId}`
    );
    return response.data;
  },
  updateFaRec: async (formData) => {
    const response = await axios.patch(
      `/api/financial-record/${financialRecordId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};
