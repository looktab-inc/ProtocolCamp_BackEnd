import express, { Router } from 'express';

import postStore from '../../functions/api/store/postStore';
import getStore from '../../functions/api/store/getStore';
import patchStore from '../../functions/api/store/patchStore';
import getStoreReview from '../../functions/api/store/getStoreReview';
import newReview from '../../functions/api/store/newReview';

const router: Router = express.Router();

// GET
router.route('/:id/detail').get(getStore);
router.route('/:id/review').get(getStoreReview);

// POST
router.route('/').post(postStore);
router.route('/review').post(newReview);

// PATCH
router.route('/').patch(patchStore);

export default router;
