import styled from '@emotion/styled';

export const AboutStyles = {
  Container: styled.div`
    padding: 1.875rem;
    word-break: keep-all;
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
  BackgroundBox: styled.div`
    width: 100%;
    height: 300px;
    margin: 2rem 0;
    background: url('/images/image/background.jpg') no-repeat center / cover;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded-default);
    box-shadow: var(--shadow-default);
    & > p {
      font-weight: 600;
      color: var(--color-white);
      font-size: var(--text-l);
    }
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
  `,
  Members: styled.div`
    width: 100%;
    & > div.top {
      display: flex;
      gap: 4px;
      & > button {
        flex: 1;
        background: var(--color-white);
        padding: 1rem;
        border-radius: var(--rounded-default);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-default);
        transition-duration: 0.3s;
        &:hover {
          transform: scale(0.95);
        }
        &:active {
          transform: scale(0.9);
        }

        & > div:nth-of-type(1) {
          border-radius: var(--rounded-full);
          border: 1px solid var(--color-gray08);
          width: 5rem;
          height: 5rem;
          overflow: hidden;

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        & > div:nth-of-type(2) {
          margin-top: 6px;
          font-weight: 500;
          & > span {
            color: var(--color-primary);
          }
        }
      }
    }

    & > div.bottom {
      margin-top: 1rem;
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
    padding: 1rem 1.875rem;
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
  PlanContainer: styled.div`
    display: flex;
    gap: 3rem;
    padding: 2rem;
    & > div.item {
      position: relative;
      flex: 1;
      padding: 2rem;
      background: var(--color-white);
      box-shadow: var(--shadow-default);
      top: 200px;
      opacity: 0;
      animation: moveUp 0.5s forwards;
      @keyframes moveUp {
        to {
          top: 0;
          opacity: 1;
        }
      }

      /* 테두리 라인 */
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 0px;
        right: 0px;
        background: var(--color-primary);
        transition: all 0.3s ease-in-out;
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0px;
        height: 1px;
        top: 0;
        background: var(--color-primary);
        transition: all 0.3s ease-in-out;
      }

      & > div.inner {
        display: flex;
        flex-direction: column;
        & > div.top {
          position: relative;
          text-align: center;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          & > h3 {
            margin-bottom: 4px;
            font-weight: 600;
            color: var(--color-primary);
          }
          & > h3 + div {
            font-size: var(--text-s);
            color: var(--color-gray03);
          }

          &::before {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: #eee;
          }
          &::after {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 0px;
            height: 1px;
            background: var(--color-primary);
            transition: all 0.3s ease-in-out;
          }
        }

        & > div.bottom {
          font-size: var(--text-s);
          color: var(--color-gray02);
        }
        &:hover > div.top::after {
          width: 100%;
        }
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 0px;
          left: 0px;
          background: var(--color-primary);
          transition: all 0.3s ease-in-out;
        }
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 0px;
          height: 1px;
          bottom: 0;
          background: var(--color-primary);
          transition: all 0.3s ease-in-out;
        }
      }
      &:hover::before {
        height: 100%;
      }
      &:hover::after {
        width: 100%;
      }
      &:hover > div::before {
        height: 100%;
      }
      &:hover > div::after {
        width: 100%;
      }
    }
    & > div.item:nth-child(1) {
      animation-delay: 0s;
    }
    & > div.item:nth-child(2) {
      animation-delay: 0.3s;
    }
    & > div.item:nth-child(3) {
      animation-delay: 0.5s;
    }
  `,
};
