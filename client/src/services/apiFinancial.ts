import { instance } from './tokenInstance';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const APIfinancialRecord = {
  // 가계부 전체조회 GET
  getRecordList: async () => {
    const res = await instance.get(`${BASE_URL}/financial-record`, {
      withCredentials: true,
    });
    console.log('레코드리스트야!');
    console.log(res);
    // const res = await axios.get('/data/recordList.json');
    return res.data;
  },
  // 가계부 POST
  createFaRec: async (formData: FormData) => {
    // const res = await axios.post('/api/financialrecord/', formData, {
    const res = await instance.post(`${BASE_URL}/financialrecord`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!res.data.success) {
      throw new Error(res.data.message || 'Error creating financial record');
    }
    return res.data;
  },
  // 가계부 1개 조회 GET
  getFaRec: async (financialRecordId: number) => {
    const res = await instance.get(`${BASE_URL}/financialrecord/${financialRecordId}`);
    // const res = await axios.get(`/data/recordHeader.json`);
    return res.data;
  },
  // 가계부 UPDATE
  updateFaRec: async (formData: FormData, financialRecordId: number) => {
    // const res = await axios.patch(`/api/financialrecord/${financialRecordId}`, formData, {
    const res = await instance.patch(`${BASE_URL}/financialrecord/${financialRecordId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!res.data.success) {
      throw new Error(res.data.message || 'Error updating financial record');
    }
    return res.data;
  },
  // 가계부 DELETE
  deleteFaRec: async (financialRecordId: number) => {
    const res = await instance.get(`${BASE_URL}/financialrecord/${financialRecordId}`);
    return res.data;
  },
  // 가계부 게시글 GET
  getRecordArticle: async (financialRecordId: number, page: number, size: number) => {
    // const res = await axios.get(
    //   `/api/financialrecord/${financialRecordId}/article?page=${page}&size=${size}`
    // );
    const res = await instance.get(
      `${BASE_URL}/financialrecord/${financialRecordId}/article?page=${page}&size=${size}`
    );
    const { data, pageInfo } = res.data;

    return { data, pageInfo };
  },
};
