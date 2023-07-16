import axios from 'axios';
import { FaRecData } from '../types/financialRecord';

export const APIfinancialRecord = {
  getRecordList: async () => {
    try {
      const res = await axios.get('/data/recordList.json');
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
  createFaRec: async (formData: FormData) => {
    try {
      const res = await axios.post('/api/financial-record/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
  getFaRec: async (financialRecordId: number) => {
    try {
      // const res = await axios.get(`/financial-record/${financialRecordId}`);
      const res = await axios.get(`/data/recordHeader.json`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
  updateFaRec: async (formData: FormData) => {
    try {
      const financialRecordId = Number(formData.get('financialRecordId'));
      const res = await axios.patch(`/api/financial-record/${financialRecordId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
  getRecordArticle: async (financialRecordId: number, page: number, size: number) => {
    try {
      const res = await axios.get(
        `/api/financial-record/${financialRecordId}/article?page=${page}&size=${size}`
      );
      const { data, pageData } = res.data;
      data.forEach((item: FaRecData) => {
        item.faDate = new Date(item.faDate);
      });
      return { data, pageData };
    } catch (err) {
      console.error(err.response.data);
      return err.response;
    }
  },
};
