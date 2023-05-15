import express, { Router } from 'express';
import google from '../../../utils/auth/google/googleOAuthVals';

const router: Router = express.Router();

router.get('/', (req, res) => {
  const {
    getOAuthURL,
    AUTHORIZE_URL,
    CLIENT_ID,
    RESPONSE_TYPE,
    REDIRECT_URL,
    SCOPE,
    ACCESS_TYPE,
  } = google;
  return res.send(
    getOAuthURL(
      AUTHORIZE_URL,
      CLIENT_ID(),
      RESPONSE_TYPE,
      REDIRECT_URL,
      SCOPE,
      ACCESS_TYPE
    )
  );
});

export default router;
