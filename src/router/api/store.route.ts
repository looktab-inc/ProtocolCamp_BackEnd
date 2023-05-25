import express, { Router } from "express";

import postStore from "../../functions/api/store/postStore";
import getStore from "../../functions/api/store/getStore";
import patchStore from "../../functions/api/store/patchStore";
import getStoreReview from "../../functions/api/store/getStoreReview";
import newReview from "../../functions/api/store/newReview";
import postLike from "../../functions/api/store/postLike";
import storeRecommend from "../../functions/api/store/getStoreRecommend";
import regRecData from "../../functions/api/store/regStoreRecommend";

const router: Router = express.Router();

// GET
router.route("/:id/detail").get(getStore);
router.route("/:id/review").get(getStoreReview);
router.route("/:id/rec").get(storeRecommend);

// POST
router.route("/").post(postStore);
router.route("/:id/review").post(newReview);
router.route("/like").post(postLike);
router.route("/:id/recreg").post(regRecData);

// PATCH
router.route("/").patch(patchStore);

export default router;
