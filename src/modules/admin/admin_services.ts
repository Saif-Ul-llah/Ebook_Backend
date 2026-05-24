import AdminRepo from "./admin_repo";

class AdminServices {
  public static overviewService = async () => {
    return AdminRepo.overview();
  };

  public static manuscriptsService = async () => {
    return AdminRepo.manuscripts();
  };

  public static usersService = async () => {
    return AdminRepo.users();
  };

  public static updateUserStatusService = async (userId: string, isActive: boolean) => {
    return AdminRepo.updateUserStatus(userId, isActive);
  };
}

export default AdminServices;
