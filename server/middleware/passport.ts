import Passport from 'passport';
import User from 'models/user';
import { Strategy as JwtStragety, ExtractJwt } from 'passport-jwt';

module.exports = (passport: typeof Passport) => {
  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    const user = await User.query().findById(id);
    done(user || null);
  });

  passport.use(
    'jwt',
    new JwtStragety(
      {
        secretOrKey: 'badsecret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (payload, done) => {
        const user = await User.query().findOne({ username: payload.username });
        console.log(user);
        return done(null, user);
      }
    )
  );
};
