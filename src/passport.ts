import argon2 from "argon2";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import prisma from "./db";

const setupPassport = () => {
  console.log("SETUP PASSPORT");
  passport.use(
    "login",
    new passportLocal.Strategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        console.log(email, password);
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          const passMatch = await argon2.verify(user.password, password);

          if (passMatch) {
            return done(null, user);
          }
        }

        return done(null, false, { message: "User not found" });
      }
    )
  );

  passport.use(
    "jwt",
    new passportJwt.Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        const user = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
        });

        delete user.password;

        done(null, user);
      }
    )
  );
};

export default setupPassport;
