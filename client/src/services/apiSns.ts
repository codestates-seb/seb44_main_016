import axios from 'axios';
// import { instance } from './tokenInstance';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const APISns = {
  // [GET] SNS 게시글 (무한 스크롤)
  getFeedArticles: async (page: number, size: number) => {
    const paramsStr = new URLSearchParams(window.location.search).toString();
    const newQueries = paramsStr === '' ? `page=${page}&size=${size}` : paramsStr; // 홈 | 랭킹(명예의 전당) 구분
    const res = await axios.get(`${BASE_URL}/feedArticles?${newQueries}`);
    const { data, pageInfo } = res.data;
    return { data, pageInfo };
  },
  // [DELETE] SNS
  deleteFeedArticle: async (feedArticleId: number) => {
    const res = await axios.delete(`${BASE_URL}/feedArticles/${feedArticleId}`);
  },
};
