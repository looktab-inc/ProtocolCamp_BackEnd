import express, { Router } from 'express';

import postStore from '../../functions/api/store/postStore';
import getStore from '../../functions/api/store/getStore';
import patchStore from '../../functions/api/store/patchStore';

const router: Router = express.Router();

// ====refactoring====
router.route('/:address').get(getStore);
router.route('/').post(postStore);
router.route('/').patch(patchStore);

export default router;
