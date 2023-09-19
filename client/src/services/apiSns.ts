import axios from 'axios';
import { instance } from './axios-instance/tokenInstance';
import { VoteType } from '../types/article';
import { FeedArticleReqType } from '../types/article';

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
    const res = await instance.delete(`${BASE_URL}/feedArticles/${feedArticleId}`);
  },
  // [POST] or [PATCH] SNS
  editFeedArticle: async (feedArticleId: number, formData: FormData, feedType: number, content: string) => {
    const isPost = isNaN(feedArticleId);

    const body: FeedArticleReqType = {
      feedType: feedType === 1 ? '절약팁' : '허락해줘', // 2: 허락해줘
      content,
    };
    formData.append('data', JSON.stringify(body));

    if (isPost) {
      await axios.post(`${BASE_URL}/feedArticles`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      await axios.patch(`${BASE_URL}/feedArticles/${feedArticleId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  },
};

export const APIVote = {
  // [GET] Vote
  getVote: async (feedArticleId: number) => {
    const res = await instance.get(`${BASE_URL}/vote/${feedArticleId}`);
    const voteData: VoteType = res.data;
    return voteData;
  },
  // [POST] 절약/Flex 버튼 눌렀을 시
  postVote: async (feedArticleId: number, voteType: 'SAVING' | 'FLEX') => {
    const res = await instance.get(`${BASE_URL}/vote/${feedArticleId}?voteType=${voteType}`);
  },
};
