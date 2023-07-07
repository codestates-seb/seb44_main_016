import type { NextApiRequest, NextApiResponse } from 'next';
import { recordList } from '../../test/recordList';

export default function financialRecord(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { financialRecordName, financialRecordDescription, imgId, userId } =
    req.body;

  const newRecord = {
    financialRecordName,
    financialRecordDescription,
    imgId,
    userId,
  };

  recordList?.unshift(newRecord);
  const responseBody = JSON.stringify(recordList);
  res.status(202).json(responseBody);
}
