import axios from 'axios';

export const APIfinancialRecord = {
  getRecordList: async () => {
    const response = await axios.get('/data/recordList.json');
    return response.data;
  },
  createRecord: async (formData) => {
    const response = await axios.post('/api/financial-record/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
