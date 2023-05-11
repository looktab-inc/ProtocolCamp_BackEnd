import dotenv from 'dotenv';
dotenv.config();

export default {
  AUTHORIZE_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
  // REDIRECT_URL: 'http://localhost:8000/auth/googlejwt',
  REDIRECT_URL: 'http://localhost:8080/oauth2/redirect',
  USERINFO_URL: `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
  RESPONSE_TYPE: 'code',
  SCOPE: 'openid%20profile%20email',
  ACCESS_TYPE: 'offline',
  CLIENT_ID: (): string => {
    dotenv.config();
    return process.env.CLIENT_ID || '';
  },
  CLIENT_SECRET: (): string => {
    dotenv.config();
    return process.env.CLIENT_SECRET || '';
  },
  getOAuthURL: (
    AUTH_URL: string,
    CID: string | undefined,
    RTYPE: string,
    RURL: string,
    SCOPE: string,
    ATYPE: string
  ) =>
    `${AUTH_URL}?client_id=${CID}&response_type=${RTYPE}&redirect_uri=${RURL}&scope=${SCOPE}&access_type=${ATYPE}`,
  getAccesstokenURL: (code: string, REDIRECT_URL: string): string =>
    `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&grant_type=authorization_code`,
};
