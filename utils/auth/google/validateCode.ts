import getAccessToken from './getAccessToken';
import getUserInfo from './getUserInfo';

export async function validateGoogleCode(code: string) {
  try {
    if (!code) return null;

    // const googleAccessToken = await getAccessToken(code);

    // const userData = await getUserInfo(googleAccessToken);
    const userData = await getUserInfo(code);

    return userData;
  } catch (e) {
    console.log(e);
    return null;
  }
}
