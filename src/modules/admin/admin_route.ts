import { Router } from "express";
import { checkAdmin, checkToken } from "../../imports";
import AdminController from "./admin_controller";

const router = Router();

router.get("/admin/overview", checkToken, checkAdmin, AdminController.overview);
router.get("/admin/manuscripts", checkToken, checkAdmin, AdminController.manuscripts);
router.get("/admin/users", checkToken, checkAdmin, AdminController.users);
router.patch(
  "/admin/users/:userId/status",
  checkToken,
  checkAdmin,
  AdminController.updateUserStatus
);

export default router;
