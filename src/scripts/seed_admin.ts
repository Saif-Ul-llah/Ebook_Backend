import { connectDatabase } from "../config/database";
import { appConfig } from "../config/app_config";
import { encryptPass } from "../utils/helpers";
import { Roles } from "../types/authTypes";
import { UserModel } from "../models";

const seedAdmin = async () => {
  await connectDatabase();

  const email = process.env.ADMIN_EMAIL || "admin@nobleinkstudios.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const fullName = process.env.ADMIN_FULL_NAME || "Noble Ink Admin";
  const phoneNumber = process.env.ADMIN_PHONE || "0000000000";

  const hashedPassword = await encryptPass(password);

  await UserModel.findOneAndUpdate(
    { email: email.toLowerCase() },
    {
      $set: {
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        phoneNumber,
        role: Roles.ADMIN,
        IsActive: true,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin user ready: ${email}`);
  console.log(`API URL: ${appConfig.appUrl}`);
};

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed admin user", error);
    process.exit(1);
  });
