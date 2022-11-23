import { Router } from "express";
import passport from "passport";

import loginRouter from "./login";
import userRouter from "./user";

const router = Router();

router.use("/login", loginRouter);

router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

export default router;
