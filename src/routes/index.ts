import express from "express";
import authRouter from "../modules/auth/auth_route";
import adminRouter from "../modules/admin/admin_route";
import manuscriptRouter from "../modules/manuscripts/manuscript_route";

const router = express.Router();

router.use(authRouter);
router.use(manuscriptRouter);
router.use(adminRouter);

export { router as allRoutes };
