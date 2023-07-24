import axios from 'axios';
import { instance } from './tokenInstance';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const APIfinancialRecord = {
  // 가계부 전체조회 GET
  getRecordList: async () => {
    const res = await instance.get(`${BASE_URL}/financial-record`);
    // const res = await axios.get('/data/recordList.json');
    return res.data;
  },
  // 가계부 POST
  createFaRec: async (formData: FormData) => {
    // const res = await axios.post('/api/financial-record/', formData, {
    const res = await instance.post(`${BASE_URL}/financial-record`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  // 가계부 1개 조회 GET
  getFaRec: async (financialRecordId: number) => {
    const res = await instance.get(`${BASE_URL}/financial-record/${financialRecordId}`);
    // const res = await axios.get(`/data/recordHeader.json`);
    return res.data;
  },
  // 가계부 UPDATE
  updateFaRec: async (formData: FormData, financialRecordId: number) => {
    // const res = await axios.patch(`/api/financial-record/${financialRecordId}`, formData, {
    const res = await instance.patch(`${BASE_URL}/financial-record/${financialRecordId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  // 가계부 DELETE
  deleteFaRec: async (financialRecordId: number) => {
    const res = await instance.get(`${BASE_URL}/financial-record/${financialRecordId}`);
    return res.data;
  },
  // 가계부 게시글 GET
  getRecordArticle: async (financialRecordId: number, page: number, size: number) => {
    // const res = await axios.get(
    //   `/api/financial-record/${financialRecordId}/article?page=${page}&size=${size}`
    // );
    const res = await instance.get(
      `${BASE_URL}/financial-record/${financialRecordId}/article?page=${page}&size=${size}`
    );
    const { data, pageInfo } = res.data;

    return { data, pageInfo };
  },
};
