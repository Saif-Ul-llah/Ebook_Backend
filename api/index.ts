import { app, databaseReady } from "../src/app";

export default async function handler(req: any, res: any) {
  await databaseReady;
  return app(req, res);
}
