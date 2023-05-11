import express, { Request, Response, Router } from 'express';
import getCampaign from '../../functions/api/campaign/getCampaign';
import postCampaign from '../../functions/api/campaign/postCampaign';

const router: Router = express.Router();

router.route('/:address').get(getCampaign);
router.route('/').post(postCampaign);

export default router;
