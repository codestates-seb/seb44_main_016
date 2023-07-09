import axios from 'axios';

export const APIfinancialRecord = {
  getRecordList: async () => {
    const response = await axios.get('/data/recordList.json');
    return response.data;
  },
};
