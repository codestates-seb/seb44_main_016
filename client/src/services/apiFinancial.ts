import { instance } from './tokenInstance';
import { FaRecArticleReqType } from '../types/article';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const APIfinancialRecord = {
  // 가계부 전체조회 GET
  getRecordList: async () => {
    const res = await instance.get(`${BASE_URL}/financialrecord`, {
      withCredentials: true,
    });
    // const res = await axios.get('/data/recordList.json');
    return res.data.data;
  },
  // 가계부 POST
  createFaRec: async (formData: FormData) => {
    // const res = await axios.post('/api/financialrecord/', formData, {
    const res = await instance.post(`${BASE_URL}/financialrecord`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
  // 가계부 게시글 DELETE
  deleteRecordArticle: async (financialRecordId: number, financialRecordArticleId: number) => {
    const res = await instance.delete(
      `${BASE_URL}/financialrecord/${financialRecordId}/article/${financialRecordArticleId}`
    );
  },
  // 가계부 게시글 POST or PATCH
  editRecordArticle: async (
    formData: FormData,
    faRecId: number,
    faRecArticleId: number,
    category: string,
    faDate: Date,
    title: string,
    price: number,
    content: string,
    scope: number
  ) => {
    const isPost = isNaN(faRecArticleId);

    const body: FaRecArticleReqType = {
      financialRecordId: faRecId,
      category,
      faDate: faDate.toISOString(),
      title,
      price,
      content,
      scope: scope === 0 ? '가계부 게시글' : '가계부 타임라인',
    };
    formData.append('data', JSON.stringify(body));

    if (isPost) {
      await instance.post(`${BASE_URL}/financialrecord/${faRecId}/article`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      await instance.patch(`${BASE_URL}/financialrecord/${faRecId}/article/${faRecArticleId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  },
};
