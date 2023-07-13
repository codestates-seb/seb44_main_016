import type { NextApiRequest, NextApiResponse } from 'next';
// import { userData } from '../../../../constants/userData';

export default function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json('탈퇴가 성공적으로 이루어졌습니다.');
}
