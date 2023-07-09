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
