import {
  asyncHandler,
  HttpError,
  manuscriptValidation,
  NextFunction,
  Request,
  Response,
  sendResponse,
  uploadToR2,
} from "../../imports";
import ManuscriptServices from "./manuscript_services";

class ManuscriptController {
  public static create = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = manuscriptValidation.validate({ ...req.body });

      if (error) {
        return next(HttpError.validationError(error.details[0].message));
      }

      const user = (req as any).user;
      const file = (req as any).file as Express.Multer.File | undefined;
      const uploadedFile = file ? await uploadToR2(file) : undefined;
      const manuscript = await ManuscriptServices.createService({
        ...value,
        ...uploadedFile,
        customerId: user?.id,
      });

      return sendResponse(
        res,
        201,
        "Manuscript brief submitted successfully",
        manuscript,
        "success"
      );
    }
  );

  public static myManuscripts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user?.id) {
        return next(HttpError.unauthorized("Unauthorized"));
      }

      const manuscripts = await ManuscriptServices.myManuscriptsService(
        user.id,
        user.email
      );

      return sendResponse(
        res,
        200,
        "Manuscripts fetched successfully",
        manuscripts,
        "success"
      );
    }
  );
}

export default ManuscriptController;
