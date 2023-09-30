import apiUser from '../../services/apiUser';
import useMutateUser from '../../services/mutate/useMutateUser';

export const useFollowMutations = (nickname: string) => {
  const { startFollowingMutate } = useMutateUser.startFollowing({
    mutateFunctionUserId: apiUser.startFollowing,
    nickname,
  });

  const { cancelFollowingMutate } = useMutateUser.cancelFollowing({
    mutateFunctionFollowId: apiUser.cancelFollowing,
    nickname,
  });

  const { deleteFollowingMutate } = useMutateUser.deleteMyFollower({
    mutateFunctionFollowId: apiUser.deleteMyFollower,
    nickname,
  });

  return {
    startFollowingMutate,
    cancelFollowingMutate,
    deleteFollowingMutate,
  };
};
