import axios from 'axios';
import google from './googleOAuthVals';
export default async (accessToken: string) => {
  try {
    const apiRes = await axios.get(google.USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return apiRes.data;
  } catch (e) {
    return null;
  }
};
