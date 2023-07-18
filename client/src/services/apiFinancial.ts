import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const APIfinancialRecord = {
  getRecordList: async () => {
    // const res = await axios.get(`${BASE_URL}/financial-record`);
    const res = await axios.get('/data/recordList.json');
    return res.data;
  },
  createFaRec: async (formData: FormData) => {
    // const res = await axios.post('/api/financial-record/', formData, {
    const res = await axios.post(`${BASE_URL}/financial-record`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  getFaRec: async (financialRecordId: number) => {
    // const res = await axios.get(`${BASE_URL}/financial-record/${financialRecordId}`);
    const res = await axios.get(`/data/recordHeader.json`);
    return res.data;
  },
  updateFaRec: async (formData: FormData) => {
    const financialRecordId = Number(formData.get('financialRecordId'));
    // const res = await axios.patch(`/api/financial-record/${financialRecordId}`, formData, {
    const res = await axios.patch(`${BASE_URL}/financial-record/${financialRecordId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  getRecordArticle: async (financialRecordId: number, page: number, size: number) => {
    // const res = await axios.get(
    //   `/api/financial-record/${financialRecordId}/article?page=${page}&size=${size}`
    // );
    const res = await axios.get(
      `${BASE_URL}/financial-record/${financialRecordId}/article?page=${page}&size=${size}`
    );
    const { data, pageData } = res.data;

    return { data, pageData };
  },
};
