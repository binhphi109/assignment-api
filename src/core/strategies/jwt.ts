import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "../../config";

module.exports = function () {
  // Use jwt strategy
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.tokenVerifyKey,
        algorithms: config.tokenSignMethod,
      },
      function (jwt_payload, done) {
        return done(null, jwt_payload);
      }
    )
  );
};
