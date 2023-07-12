import type { NextApiRequest, NextApiResponse } from 'next';
import { recordList } from '../../test/recordList';

export default function financialRecord(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { financialRecordName, memo, imgId, userId } = req.body;

    const financialRecordId = recordList.length + 1;

    const newRecord = {
      financialRecordId,
      financialRecordName,
      memo,
      imgId,
      userId,
    };

    recordList?.unshift(newRecord);
    const responseBody = JSON.stringify(recordList);
    res.status(202).json(responseBody);
  }
}
