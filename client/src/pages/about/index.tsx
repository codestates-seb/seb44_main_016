import styled from '@emotion/styled';
import { useState } from 'react';
import { INTRO, MEMBERS } from '../../constants/about';

export default function About() {
  return (
    <S.Container>
      <h1 className='blind'>팀 선빵 소개페이지</h1>
      <S.Section>
        <S.Title># Team. 선빵</S.Title>
        <p>
          안녕하세요. 팀 <S.Mark>선빵</S.Mark>입니다.
          <br /> 저희는 SNS와 가계부를 합친 SNS형 가계부 <S.Mark>'제로힙'</S.Mark> 프로젝트를 진행하고
          있습니다. 소통의 공간이 소비로 통하는 요즘, 제로의 힙, 소통의 힘을 믿으며 서비스를 개발 중입니다. 수
          백의 '있어빌리티'보다 당신의 <S.Mark>'제로빌리티'</S.Mark>를 응원합니다! <br />
        </p>
        <S.Point>당신의 과소비가 0에 수렴할 때 까지, 제로힙.</S.Point>
      </S.Section>
      <S.Section>
        <S.Title># 기획 의도</S.Title>
        <S.Ul>
          {INTRO.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </S.Ul>
      </S.Section>

      <S.Section>
        <S.Title># 팀원 소개</S.Title>
        {MEMBERS.map((member, i) => (
          <S.ContentWrap key={i}>
            <S.ContentImg>
              <img src={member.img} alt={member.name} />
            </S.ContentImg>
            <S.ContentInfo>
              <div>
                <S.MemberTitle>
                  <S.Team>{member.team}</S.Team>
                  <div>
                    {member.name}
                    <S.Github>
                      <a href={member.githubUrl} target='_blank' rel='noreferrer'>
                        {member.githubNick}
                      </a>
                    </S.Github>
                  </div>
                </S.MemberTitle>
                <S.Content>{member.content}</S.Content>
              </div>
            </S.ContentInfo>
          </S.ContentWrap>
        ))}
      </S.Section>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 1.875rem;

    & > section {
      margin-bottom: 1.6rem;
    }
  `,
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  `,
  ContentWrap: styled.div`
    display: flex;
    padding: 1rem;
    background: var(--color-white);
    box-shadow: var(--shadow-default);
    border-radius: var(--rounded-default);

    & > div {
      width: 50%;
    }
    &:nth-child(odd) > div:nth-of-type(1) {
      order: 1;
    }
  `,
  ContentImg: styled.div`
    overflow: hidden;
    border-radius: var(--rounded-default);
    height: 25rem;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  ContentInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.875rem;
  `,
  MemberTitle: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-weight: 500;
    & > div {
      font-size: var(--text-l);
      display: flex;
      align-items: center;
    }
  `,
  Title: styled.h2`
    font-size: var(--text-l);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to right, #0d0d0d, var(--color-primary));
    display: inline-block;
  `,
  Point: styled.div`
    margin: 3rem 0;
    font-size: var(--text-xl);
    text-align: center;
    color: var(--color-primary);
    font-weight: 600;
    width: 100%;
  `,
  Team: styled.span`
    font-weight: 500;
    color: var(--color-white);
    display: inline-block;
    padding: 0 0.625rem;
    background: var(--color-primary);
    border-radius: var(--rounded-default);
    margin-bottom: 0.3rem;
    font-size: var(--text-m);
  `,
  Github: styled.span`
    font-weight: 400;
    font-size: var(--text-default);
    margin-left: 0.5rem;
    color: var(--color-primary);
  `,
  Content: styled.div`
    color: var(--color-gray03);
    font-weight: var(--text-s);
  `,
  Mark: styled.mark`
    background: var(--color-point-lilac);
    border-radius: var(--rounded-default);
    padding: 0 6px;
  `,
  Ul: styled.ul`
    & > li {
      margin: 1rem 0;
      display: flex;
      align-items: flex-start;
    }
    & > li::before {
      content: '';
      display: inline-block;
      margin-right: 10px;
      width: 8px;
      height: 8px;
      border-radius: var(--rounded-full);
      background: var(--color-primary);
      box-shadow: var(--shadow-default);
      flex-shrink: 0;
      transform: translateY(calc(50% + 2px));
    }
  `,
};
