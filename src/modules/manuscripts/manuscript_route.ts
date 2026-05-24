import { Router } from "express";
import { checkToken, manuscriptUpload } from "../../imports";
import ManuscriptController from "./manuscript_controller";

const router = Router();

router.post(
  "/manuscripts",
  manuscriptUpload.single("manuscript"),
  ManuscriptController.create
);
router.get("/my-manuscripts", checkToken, ManuscriptController.myManuscripts);

export default router;
