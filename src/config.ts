import "dotenv/config";
import path from "path";
import { getGlobbedPaths } from "./core/utils/path";

export default {
  app: {
    title: "Sample API",
    version: "1.0.0",
    description: "",
  },
  port: 3000,
  mongodb: process.env.MONGO_CONNECTION || "",
  tokenSignMethod: [process.env.TOKEN_SIGN_METHOD || "HS256"],
  tokenSignKey: process.env.TOKEN_SIGN_KEY || "secret",
  tokenVerifyKey: process.env.TOKEN_VERIFY_KEY || "secret",
  tokenExpiresIn: process.env.TOKEN_EXPIRES_IN || 5356800, // in seconds
  // Setting Globbed route files
  files: {
    routes: getGlobbedPaths(path.join(__dirname, "../routes/**/*.{ts,js}")),
    models: getGlobbedPaths(path.join(__dirname, "../models/**/*.{ts,js}")),
  },
};
