const passport = require('passport');
const config = require('config');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserController = require('../../modules/user/user.controller');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

if (config.has('services.facebook')) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.get('services.facebook.key'),
        clientSecret: config.get('services.facebook.secret'),
        callbackURL: config.get('app.url') + config.get('services.facebook.callback'),
        passReqToCallback: true,
        profileFields: [
          'id',
          'emails',
          'name',
          'displayName',
          'gender',
          'birthday',
          'picture.type(large)'
        ]
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          const pData = profile._json;
          const data = {
            service: 'facebook',
            service_id: pData.id,
            extras: Object.assign(pData, {
              imageUrl: pData.picture.data.url
            })
          };
          UserController.loginExternal(data).then(d => done(null, d));
        });
      }
    )
  );
}

if (config.has('services.google')) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get('services.google.key'),
        clientSecret: config.get('services.google.secret'),
        callbackURL: config.get('app.url') + config.get('services.google.callback'),
        passReqToCallback: true
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          const pData = profile._json;
          const data = {
            service: 'google',
            service_id: profile.id,
            extras: Object.assign(pData, {
              name: pData.name,
              gender: pData.gender,
              imageUrl: pData.picture
            })
          };

          // if (
          //   pData.hd != "rumsan.com" &&
          //   pData.hd != "rumsan.net" &&
          //   pData.hd != "hamrolifebank.org" &&
          //   pData.hd != "hamrolifebank.com"
          // )
          //   return done(null, false, {
          //     message: "You must use Rumsan Group's Google account to Login."
          //   });

          UserController.loginExternal(data)
            .then(d => done(null, d))
            .catch(e => done(null, false, { message: e.message }));
        });
      }
    )
  );
}
