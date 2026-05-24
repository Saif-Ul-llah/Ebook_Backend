import { ManuscriptModel, ManuscriptStatus, UserModel } from "../../imports";

class AdminRepo {
  public static overview = async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalManuscripts,
      newManuscripts,
      inReviewManuscripts,
      contactedManuscripts,
      closedManuscripts,
      todayManuscripts,
      manuscriptsWithFiles,
      activeUsers,
      adminUsers,
      recentUsers,
      serviceBreakdown,
      genreBreakdown,
      recentManuscripts,
    ] = await Promise.all([
      UserModel.countDocuments(),
      ManuscriptModel.countDocuments(),
      ManuscriptModel.countDocuments({ status: ManuscriptStatus.NEW }),
      ManuscriptModel.countDocuments({ status: ManuscriptStatus.IN_REVIEW }),
      ManuscriptModel.countDocuments({ status: ManuscriptStatus.CONTACTED }),
      ManuscriptModel.countDocuments({ status: ManuscriptStatus.CLOSED }),
      ManuscriptModel.countDocuments({ createdAt: { $gte: startOfToday } }),
      ManuscriptModel.countDocuments({ fileKey: { $exists: true, $ne: "" } }),
      UserModel.countDocuments({ IsActive: true }),
      UserModel.countDocuments({ role: "ADMIN" }),
      UserModel.find().sort({ createdAt: -1 }).limit(6).select("-password").lean(),
      ManuscriptModel.aggregate([
        { $group: { _id: "$serviceType", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      ManuscriptModel.aggregate([
        { $group: { _id: "$genre", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      ManuscriptModel.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);

    return {
      totals: {
        users: totalUsers,
        manuscripts: totalManuscripts,
        todayManuscripts,
        manuscriptsWithFiles,
        activeUsers,
        adminUsers,
      },
      statuses: {
        new: newManuscripts,
        inReview: inReviewManuscripts,
        contacted: contactedManuscripts,
        closed: closedManuscripts,
      },
      serviceBreakdown: serviceBreakdown.map((item) => ({
        serviceType: item._id || "Unknown",
        count: item.count,
      })),
      genreBreakdown: genreBreakdown.map((item) => ({
        genre: item._id || "Unknown",
        count: item.count,
      })),
      recentUsers: recentUsers.map((user) => ({
        id: String((user as any)._id),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isActive: user.IsActive,
        createdAt: user.createdAt,
      })),
      recentManuscripts: recentManuscripts.map((item) => ({
        id: String((item as any)._id),
        fullName: item.fullName,
        lastName: item.lastName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        serviceType: item.serviceType,
        projectTitle: item.projectTitle,
        genre: item.genre,
        message: item.message,
        fileKey: item.fileKey,
        fileName: item.fileName,
        fileType: item.fileType,
        fileSize: item.fileSize,
        fileUrl: item.fileUrl,
        status: item.status,
        createdAt: item.createdAt,
      })),
    };
  };

  public static manuscripts = async () => {
    const manuscripts = await ManuscriptModel.find().sort({ createdAt: -1 }).lean();

    return manuscripts.map((item) => ({
      id: String((item as any)._id),
      fullName: item.fullName,
      lastName: item.lastName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      serviceType: item.serviceType,
      projectTitle: item.projectTitle,
      genre: item.genre,
      message: item.message,
      fileKey: item.fileKey,
      fileName: item.fileName,
      fileType: item.fileType,
      fileSize: item.fileSize,
      fileUrl: item.fileUrl,
      status: item.status,
      createdAt: item.createdAt,
    }));
  };

  public static users = async () => {
    const users = await UserModel.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .lean();

    return users.map((user) => ({
      id: String((user as any)._id),
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isActive: user.IsActive,
      createdAt: user.createdAt,
    }));
  };

  public static updateUserStatus = async (userId: string, isActive: boolean) => {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { IsActive: isActive } },
      { new: true }
    ).select("-password");

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isActive: user.IsActive,
      createdAt: user.createdAt,
    };
  };
}

export default AdminRepo;
