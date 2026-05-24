import * as dotenv from "dotenv";
dotenv.config();

interface AppConfig {
  port: number;
  dbUrl: string;
  jwtSecret: string;
  appUrl: string;
  googleMapsKey: string;
  emailUser: string;
  emailPassword: string;
  emailHost: string;
  emailPort: number;
  emailTo: string;
  r2AccountId: string;
  r2AccessKeyId: string;
  r2SecretAccessKey: string;
  r2BucketName: string;
  r2PublicUrl: string;
}

export const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || "5000", 10),
  dbUrl:
    process.env.MONGO_URI ||
    process.env.DB_URL ||
    "mongodb://localhost:27017/ts_boiler_plate_mern",
  jwtSecret: process.env.JWT_SECRET || "secret",
  appUrl: process.env.APP_URL || "http://localhost:5000",
  emailUser: process.env.EMAIL_USER || "email",
  emailPassword: process.env.EMAIL_PASSWORD || "password",
  emailHost: process.env.EMAIL_HOST || "smtp.gmail.com",
  emailPort: parseInt(process.env.EMAIL_PORT || "465", 10),
  emailTo: process.env.EMAIL_TO || "fullstackwebsitedeveloper11@gmail.com",
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY || "",
  r2AccountId: process.env.R2_ACCOUNT_ID || "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  r2BucketName: process.env.R2_BUCKET_NAME || "",
  r2PublicUrl: process.env.R2_PUBLIC_URL || "",
};
