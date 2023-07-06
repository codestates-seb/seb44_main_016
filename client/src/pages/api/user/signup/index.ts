import type { NextApiRequest, NextApiResponse } from 'next';
import { userData } from '../../../test/userData';

export default function signUp(req: NextApiRequest, res: NextApiResponse) {
  const userId = Math.floor(Math.random() * 1000);
  const { email, loginId, password, nickname } = req.body;

  const newUser = {
    userId,
    email,
    loginId,
    password,
    nickname,
  };

  userData.unshift(newUser);
  const responseBody = JSON.stringify(newUser);
  res.status(201).json(responseBody);
}
