import { asyncHandler, Request, Response, sendResponse } from "../../imports";
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
}

export default AdminController;
