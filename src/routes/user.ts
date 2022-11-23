import { Router } from "express";

const router = Router();

router.get("/me", async (req, res) => {
  return res.json(req.user);
});

export default router;
