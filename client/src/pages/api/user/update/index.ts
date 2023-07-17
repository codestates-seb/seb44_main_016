import type { NextApiRequest, NextApiResponse } from 'next';

export default function signUp(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json('성공!');
}
