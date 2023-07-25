import type { NextApiRequest, NextApiResponse } from 'next';
import { userData } from '../../../../constants/userData';

export default function signUp(req: NextApiRequest, res: NextApiResponse) {
  const userId = Math.floor(Math.random() * 1000) + 'ashg';
  const { email, loginId, password, nickname } = req.body;

  const user = userData.find((user) => user.loginId === loginId);

  if (!user) {
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
  } else {
    res.status(401).json({
      fieldErrors: { field: '아이디', reason: '중복된 아이디입니다.' },
    });
  }
}
