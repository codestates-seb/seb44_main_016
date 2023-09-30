import { useEffect, useState } from 'react';
import { FollowerUsersInfoData, FollowingUsersInfoData, UserInfoResData } from '../../types/user';

interface useFollowStatusParams {
  userPageData: UserInfoResData;
  globalLoginId: string | undefined | null;
}

export const useFollowStatus = ({ userPageData, globalLoginId }: useFollowStatusParams) => {
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(undefined);
  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(undefined);
  const [followingFollowId, setFollowingFollowId] = useState<number | undefined>(undefined);
  const [followerFollowId, setFollowerFollowId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const newIsFollowing = userPageData?.followerList.some(
      (follower: FollowerUsersInfoData) => follower.followerId === globalLoginId
    );

    const newIsFollowed = userPageData?.followingList.some(
      (follower: FollowingUsersInfoData) => follower.followingId === globalLoginId
    );

    setIsFollowing(newIsFollowing);
    setIsFollowed(newIsFollowed);

    const myInfoFollowingThisUser =
      userPageData?.followerList.length > 0 &&
      userPageData?.followerList.find((follower) => follower.followerId === globalLoginId);

    const myInfoFollowedByThisUser =
      userPageData?.followingList.length > 0 &&
      userPageData?.followingList.find((follower) => follower.followingId === globalLoginId);

    if (myInfoFollowingThisUser) {
      const { followId: newFollowingFollowId } = myInfoFollowingThisUser;
      setFollowingFollowId(newFollowingFollowId);
    }

    if (myInfoFollowedByThisUser) {
      const { followId: newFollowerFollowId } = myInfoFollowedByThisUser;
      setFollowerFollowId(newFollowerFollowId);
    }
  }, [userPageData, globalLoginId]);

  return { isFollowing, isFollowed, followingFollowId, followerFollowId };
};
