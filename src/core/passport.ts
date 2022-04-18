import { Express } from "express";
import passport from "passport";
import path from "path";
import config from "../config";
import { getGlobbedPaths } from "./utils/path";

export default {
  init: function (app: Express) {
    // Initialize strategies
    var files = getGlobbedPaths(path.join(__dirname, "./strategies/**/*.{ts,js}"));
    files.forEach(
      function (strategy) {
        require(path.resolve(strategy))(config);
      }
    );

    // Add passport's middleware
    app.use(passport.initialize());

    // Deserialize user from token
    app.use(function (req, res, next) {
      // Check if request is authenticated
      if (req.headers.authorization) {
        passport.authenticate("jwt", function (err, user, info) {
          // Attach user to request
          if (user) {
            req.user = user;
          }
          next();
        })(req, res, next);
      } else {
        next();
      }
    });
  },
};
