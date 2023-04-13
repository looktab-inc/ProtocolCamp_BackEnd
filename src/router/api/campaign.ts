import express, { Request, Response, Router } from 'express';
import getCampaign from '../../functions/api/campaign/getCampaign';
import postCampaign from '../../functions/api/campaign/postCampaign';

const router: Router = express.Router();

router.get('/:address', async (req: Request, res: Response) => {
  getCampaign(req, res);
});
router.post('/', async (req: Request, res: Response) => {
  postCampaign(req, res);
});

export default router;
