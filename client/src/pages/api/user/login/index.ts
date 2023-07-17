import type { NextApiRequest, NextApiResponse } from 'next';
import { userData } from '../../../../constants/userData';
// import jwt from 'jsonwebtoken';

export default function logIn(req: NextApiRequest, res: NextApiResponse) {
  const { loginId, password } = req.body;

  const user = userData.find((user) => user.loginId === loginId);
  console.log(user);
  const salt = Math.floor(Math.random() * 100);

  if (user && user.password === password) {
    // const accessToken = '임시어세스토큰' + salt;
    const refreshToken = '임시리프레시토큰' + salt;

    const { password: _password, ...userInfo } = user;

    const response = {
      accessToken,
      refreshToken,
      user: userInfo,
    };
    // res.setHeader('Authorization', accessToken);
    res.status(200).json(response);
  } else {
    res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
  }
}
