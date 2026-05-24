import AdminRepo from "./admin_repo";

class AdminServices {
  public static overviewService = async () => {
    return AdminRepo.overview();
  };

  public static manuscriptsService = async () => {
    return AdminRepo.manuscripts();
  };
}

export default AdminServices;
