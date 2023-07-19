import styled from '@emotion/styled';
import { useState } from 'react';
import extractValueFromUrl from '../../../utils/extractFromURL';
import { useAppDispatch } from '../../../components/redux/hooks';
import { changeImgSrc } from '../../../components/redux/currentImgReducer';
import { store } from '../../../components/redux/store';
import { UserInfoResData } from '../../../types/user';

interface RandomAvatarUpdateProps {
  myInfoData: UserInfoResData;
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
}

export default function RandomAvatarUpdate({ myInfoData, setIsOpen, isOpen }: RandomAvatarUpdateProps) {
  const dispatch = useAppDispatch();
  const currentImgSrc = store.getState().currentImgReducer.currentImgSrc;

  const [avatarImgURL, setAvatarImgURL] = useState(
    currentImgSrc ? currentImgSrc : myInfoData?.profileImgPath
  );
  const [changeAvatarNumber, setChangeAvatarNumber] = useState(
    myInfoData ? Number(extractValueFromUrl(myInfoData.profileImgPath, myInfoData.loginId)) : null
  );

  const handleChooseAvatarProfileImg = () => {
    dispatch(changeImgSrc({ currentImgSrc: avatarImgURL, isAvatar: true }));
    setIsOpen(!isOpen);
  };

  const handleChangeAvatarImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setChangeAvatarNumber((prev: number) => prev + 1);
    setAvatarImgURL(`https://source.boringavatars.com/beam/150/${myInfoData?.loginId}${changeAvatarNumber}`);
  };

  return (
    <>
      <S.UserImg>
        <img src={avatarImgURL} />
      </S.UserImg>
      <S.ButtonWrap>
        <button type='button' onClick={handleChooseAvatarProfileImg}>
          지금 아바타로 <br /> 결정하기
        </button>
        <button onClick={handleChangeAvatarImg}>
          다시 랜덤으로 <br /> 돌리기
        </button>
      </S.ButtonWrap>
    </>
  );
}

const S = {
  UserImg: styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    transition-duration: 0.7s;
    margin-bottom: 1.7rem;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition-duration: 0.7s;
    }
    &:hover > img {
      transform: scale(1.1);
    }
  `,
  ButtonWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      width: 120px;
      text-align: center;
      line-height: 110%;
      color: var(--color-white);
      padding: 0.75rem;
      background: var(--color-primary);
      border-radius: 100px;
      border: 2px solid var(--color-primary);
      &:hover {
        background: var(--color-white);
        font-weight: 600;
        color: var(--color-primary);
      }
    }
    & > button:nth-of-type(2) {
      border: 2px solid var(--color-point-light-gray);
      background: var(--color-point-light-gray);
      color: var(--color-gray01);
      margin-left: 1rem;
      font-weight: 500;
      &:hover {
        background: var(--color-white);
        color: var(--color-point-gray);
      }
    }
  `,
};
