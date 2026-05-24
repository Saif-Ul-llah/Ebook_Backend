import { Router } from "express";
import { checkToken } from "../../imports";
import ManuscriptController from "./manuscript_controller";

const router = Router();

router.post("/manuscripts", ManuscriptController.create);
router.get("/my-manuscripts", checkToken, ManuscriptController.myManuscripts);

export default router;
