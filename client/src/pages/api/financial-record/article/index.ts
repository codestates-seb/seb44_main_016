import type { NextApiRequest, NextApiResponse } from 'next';
import { recordArticle } from '../../../test/recordArticle';

export default function financialRecordEdit(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page);
  const size = Number(req.query.size);

  if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
    res.status(400).json({ message: 'Invalid page or size parameter' });
    return;
  }

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const pageOfRecords = recordArticle.slice(startIndex, endIndex);

  if (pageOfRecords.length > 0) {
    res.status(200).json(pageOfRecords);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
}
