import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { appConfig, HttpError } from "../imports";

export type UploadedFileMetadata = {
  fileKey: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl?: string;
};

const getR2Client = () => {
  if (
    !appConfig.r2AccountId ||
    !appConfig.r2AccessKeyId ||
    !appConfig.r2SecretAccessKey ||
    !appConfig.r2BucketName
  ) {
    throw HttpError.validationError("R2 storage is not configured");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${appConfig.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: appConfig.r2AccessKeyId,
      secretAccessKey: appConfig.r2SecretAccessKey,
    },
  });
};

export const uploadToR2 = async (
  file: Express.Multer.File
): Promise<UploadedFileMetadata> => {
  const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileKey = `manuscripts/${Date.now()}-${safeName}`;
  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: appConfig.r2BucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return {
    fileKey,
    fileName: file.originalname,
    fileType: file.mimetype,
    fileSize: file.size,
    fileUrl: appConfig.r2PublicUrl
      ? `${appConfig.r2PublicUrl.replace(/\/$/, "")}/${fileKey}`
      : undefined,
  };
};
