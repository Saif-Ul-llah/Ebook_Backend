import { asyncHandler, HttpError, Request, Response, sendResponse } from "../../imports";
import AdminServices from "./admin_services";

class AdminController {
  public static overview = asyncHandler(async (req: Request, res: Response) => {
    const overview = await AdminServices.overviewService();
    return sendResponse(res, 200, "Admin overview fetched successfully", overview, "success");
  });

  public static manuscripts = asyncHandler(async (req: Request, res: Response) => {
    const manuscripts = await AdminServices.manuscriptsService();
    return sendResponse(res, 200, "Admin manuscripts fetched successfully", manuscripts, "success");
  });

  public static users = asyncHandler(async (req: Request, res: Response) => {
    const users = await AdminServices.usersService();
    return sendResponse(res, 200, "Admin users fetched successfully", users, "success");
  });

  public static updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      throw HttpError.validationError("isActive must be a boolean");
    }

    const user = await AdminServices.updateUserStatusService(userId, isActive);

    if (!user) {
      throw HttpError.notFound("User not found");
    }

    return sendResponse(res, 200, "User status updated successfully", user, "success");
  });
}

export default AdminController;
