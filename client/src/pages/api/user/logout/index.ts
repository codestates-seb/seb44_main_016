import type { NextApiRequest, NextApiResponse } from 'next';

export default function LogOut(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json('로그아웃 성공!');
}
