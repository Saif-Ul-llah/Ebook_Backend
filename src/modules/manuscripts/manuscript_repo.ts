import { IManuscript, ManuscriptInput, ManuscriptModel } from "../../imports";

class ManuscriptRepo {
  public static create = async (payload: ManuscriptInput) => {
    const manuscript = await ManuscriptModel.create(payload);

    return {
      id: manuscript.id,
      fullName: manuscript.fullName,
      lastName: manuscript.lastName,
      email: manuscript.email,
      phoneNumber: manuscript.phoneNumber,
      serviceType: manuscript.serviceType,
      projectTitle: manuscript.projectTitle,
      genre: manuscript.genre,
      message: manuscript.message,
      fileKey: manuscript.fileKey,
      fileName: manuscript.fileName,
      fileType: manuscript.fileType,
      fileSize: manuscript.fileSize,
      fileUrl: manuscript.fileUrl,
      status: manuscript.status,
      createdAt: manuscript.createdAt,
    };
  };

  public static findByCustomer = async (customerId: string, email?: string) => {
    const manuscripts = await ManuscriptModel.find({
      $or: [{ customerId }, ...(email ? [{ email: email.toLowerCase() }] : [])],
    })
      .sort({ createdAt: -1 })
      .lean<IManuscript[]>();

    return manuscripts.map((manuscript) => ({
      id: manuscript._id.toString(),
      fullName: manuscript.fullName,
      lastName: manuscript.lastName,
      email: manuscript.email,
      phoneNumber: manuscript.phoneNumber,
      serviceType: manuscript.serviceType,
      projectTitle: manuscript.projectTitle,
      genre: manuscript.genre,
      message: manuscript.message,
      fileKey: manuscript.fileKey,
      fileName: manuscript.fileName,
      fileType: manuscript.fileType,
      fileSize: manuscript.fileSize,
      fileUrl: manuscript.fileUrl,
      status: manuscript.status,
      createdAt: manuscript.createdAt,
    }));
  };
}

export default ManuscriptRepo;
