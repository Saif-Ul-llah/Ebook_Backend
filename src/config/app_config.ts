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

const cleanEnv = (value: string | undefined, fallback = "") => {
  if (!value) return fallback;
  return value.trim().replace(/^['"]|['"]$/g, "");
};

export const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || "5000", 10),
  dbUrl:
    cleanEnv(process.env.MONGO_URI) ||
    cleanEnv(process.env.DB_URL) ||
    "mongodb://localhost:27017/ts_boiler_plate_mern",
  jwtSecret: cleanEnv(process.env.JWT_SECRET, "secret"),
  appUrl: cleanEnv(process.env.APP_URL, "http://localhost:5000"),
  emailUser: cleanEnv(process.env.EMAIL_USER, "email"),
  emailPassword: cleanEnv(process.env.EMAIL_PASSWORD, "password"),
  emailHost: cleanEnv(process.env.EMAIL_HOST, "smtp.gmail.com"),
  emailPort: parseInt(cleanEnv(process.env.EMAIL_PORT, "465"), 10),
  emailTo: cleanEnv(process.env.EMAIL_TO, "fullstackwebsitedeveloper11@gmail.com"),
  googleMapsKey: cleanEnv(process.env.GOOGLE_MAPS_API_KEY),
  r2AccountId: cleanEnv(process.env.R2_ACCOUNT_ID),
  r2AccessKeyId: cleanEnv(process.env.R2_ACCESS_KEY_ID),
  r2SecretAccessKey: cleanEnv(process.env.R2_SECRET_ACCESS_KEY),
  r2BucketName: cleanEnv(process.env.R2_BUCKET_NAME),
  r2PublicUrl: cleanEnv(process.env.R2_PUBLIC_URL),
};
