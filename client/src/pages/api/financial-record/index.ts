import type { NextApiRequest, NextApiResponse } from 'next';
import { recordList } from '../../test/recordList';

export default function financialRecord(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { financialRecordName, financialRecordDescription, imgId, userId } =
      req.body;

    const financialRecordId = recordList.length + 1;

    const newRecord = {
      financialRecordId,
      financialRecordName,
      financialRecordDescription,
      imgId,
      userId,
    };

    recordList?.unshift(newRecord);
    const responseBody = JSON.stringify(recordList);
    res.status(202).json(responseBody);
  } else if (req.method === 'GET') {
    const { financialRecordId } = req.query;
    const record = recordList.find(
      (el) => el.financialRecordId === Number(financialRecordId)
    );

    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  }
}
