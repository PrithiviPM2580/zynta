import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findByIdUserService } from "../services/user.service";
import { Env } from "./env.config";
import { UnauthorizedException } from "../utils/app-error.util";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req.cookies?.accessToken;
          if (!token) throw new UnauthorizedException("Unauthorized access");
          return token;
        },
      ]),
      secretOrKey: Env.JWT_SECRET,
      audience: ["user"],
      algorithms: ["HS256"],
    },
    async (payload, done) => {
      try {
        const user = payload?.userId
          ? await findByIdUserService(payload.userId)
          : null;

        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(null, false);
      }
    },
  ),
);

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});
