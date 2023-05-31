import express, { Request, Response, Router } from "express";
import { getBalance } from "../../functions/api/user/getBlance";
import { createUser } from "../../functions/api/user/createUser";
import { getUsername } from "../../functions/api/user/getUsername";
import getCandyLog from "../../functions/api/user/getCandyLog";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("This is /api/user Root");
});

// GET
router.route("/sol/:user_id").get(getBalance);
router.route("/username/:username").get(getUsername);
router.route("/candylog/:user_id").get(getCandyLog);
router.route("/burn/:like_id").get();

// POST
router.route("/newuser").post(createUser);

export default router;
