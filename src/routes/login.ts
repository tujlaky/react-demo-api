import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    return res.json({
      token: jwt.sign(
        {
          id: (req.user as any).id,
        },
        process.env.JWT_SECRET
      ),
    });
  }
);

export default router;
