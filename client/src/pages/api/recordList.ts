import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), './temp/recordList.json'); // JSON 파일 경로
    const data = fs.readFileSync(filePath, 'utf-8'); // 파일 읽기
    const jsonData = JSON.parse(data); // JSON 파싱

    res.status(200).json(jsonData); // 응답으로 JSON 데이터 보내기
  } catch (error) {
    res.status(500).json({ error: 'Cannot read the file' }); // 에러 핸들링
  }
}
