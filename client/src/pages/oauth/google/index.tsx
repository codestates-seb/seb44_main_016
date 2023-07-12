import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loading from '../../../components/Loading';

const KakaoOauthRedirection = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code);
  }, []);

  const router = useRouter();

  //! 백엔드로 토큰 보내기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`);
  //       const userData = response.data;
  //       localStorage.setItem('name', userData.user_name);
  //       router.push('/');
  //     } catch (error) {
  //       console.error('Error:', error);
  //       router.push('/404');

  //       // Handle error cases here
  //     }
  //   };

  //   fetchData();
  // }, [code, navigate]);

  return <Loading />;
};

export default KakaoOauthRedirection;
