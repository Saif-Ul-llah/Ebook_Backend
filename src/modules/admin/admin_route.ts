import { Router } from "express";
import { checkAdmin, checkToken } from "../../imports";
import AdminController from "./admin_controller";

const router = Router();

router.get("/admin/overview", checkToken, checkAdmin, AdminController.overview);
router.get("/admin/manuscripts", checkToken, checkAdmin, AdminController.manuscripts);

export default router;
