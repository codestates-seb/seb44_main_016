import axios from 'axios';
import { PostSignUp } from '../types/user';

export default async function postSignUpData(url: string, data: PostSignUp) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
