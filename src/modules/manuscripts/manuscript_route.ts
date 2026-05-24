import { Router } from "express";
import { checkToken, manuscriptUpload, optionalToken } from "../../imports";
import ManuscriptController from "./manuscript_controller";

const router = Router();

router.post(
  "/manuscripts",
  optionalToken,
  manuscriptUpload.single("manuscript"),
  ManuscriptController.create
);
router.get("/my-manuscripts", checkToken, ManuscriptController.myManuscripts);
router.post(
  "/my-manuscripts/claim",
  checkToken,
  ManuscriptController.claimMyManuscripts
);
router.put(
  "/my-manuscripts/:manuscriptId",
  checkToken,
  ManuscriptController.updateMyManuscript
);

export default router;
