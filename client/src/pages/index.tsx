import React from 'react';

import tw from 'twin.macro';
import SnsArticle from '../components/common/SnsArticle';

const HomePageContainer = tw.div`
w-full flex flex-col items-center p-[30px] gap-[30px]
`;

export default function HomePage() {
  return (
    <HomePageContainer>
      <SnsArticle></SnsArticle>
      <SnsArticle></SnsArticle>
      <SnsArticle></SnsArticle>
      <SnsArticle></SnsArticle>
      <SnsArticle></SnsArticle>
    </HomePageContainer>
  );
}
