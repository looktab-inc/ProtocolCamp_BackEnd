import axios from 'axios';
import google from './googleOAuth';
export default async (code: string) => {
  try {
    const apiRes = await axios.post(
      google.getAccesstokenURL(code, google.REDIRECT_URL)
    );
    return apiRes.data.access_token;
  } catch (e) {
    return null;
  }
};
