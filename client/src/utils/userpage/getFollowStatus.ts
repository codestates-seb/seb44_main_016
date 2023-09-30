interface FollowStatus {
  isMyPage?: boolean;
  title?: string;
  isFollowing: boolean | undefined;
  isFollowed: boolean | undefined;
}

export const getFollowStatusUserPage = ({ isMyPage, isFollowing, isFollowed }: FollowStatus) => {
  let btnName;
  if (isMyPage) {
    btnName = '설정';
  } else if (!isMyPage && isFollowing && isFollowed) {
    btnName = '맞구독 취소';
  } else if (!isMyPage && isFollowing && !isFollowed) {
    btnName = '구독 취소';
  } else {
    btnName = '구독하기';
  }
  return btnName;
};
