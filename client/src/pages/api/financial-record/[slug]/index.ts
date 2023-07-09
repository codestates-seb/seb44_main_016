import type { NextApiRequest, NextApiResponse } from 'next';
import { recordList } from '../../../test/recordList';

export default function financialRecordEdit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const {
      financialRecordId,
      financialRecordName,
      financialRecordDescription,
      imgId,
      userId,
    } = req.body;

    const updatedRecord = {
      financialRecordId,
      financialRecordName,
      financialRecordDescription,
      imgId,
      userId,
    };

    const updatedRecordList = recordList.map((record) =>
      record.financialRecordId === financialRecordId ? updatedRecord : record
    );

    const responseBody = JSON.stringify(updatedRecordList);
    res.status(200).json(responseBody);
  }
}
