import axios from 'axios';

export const APIfinancialRecord = {
  getRecordList: async () => {
    const response = await axios.get('/data/recordList.json');
    return response.data;
  },
  createFaRec: async (formData: FormData) => {
    const response = await axios.post('/api/financial-record/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getFaRec: async (financialRecordId: number) => {
    const response = await axios.get(`/api/financial-record/${financialRecordId}`);
    return response.data;
  },
  updateFaRec: async (formData: FormData) => {
    const financialRecordId = Number(formData.get('financialRecordId'));
    const response = await axios.patch(`/api/financial-record/${financialRecordId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getRecordArticle: async (financialRecordId: number, page: number, size: number) => {
    const response = await axios.get(
      `/api/financial-record/${financialRecordId}/article?page=${page}&size=${size}`
    );
    const { data, pageData } = response.data;
    return { data, pageData };
  },
};
