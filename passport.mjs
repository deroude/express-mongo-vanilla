import passport from 'passport';
import passportBasic from 'passport-http';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';
import { User } from './rest/user/user.model';
import * as config from './config.mjs';

passport.use(new passportBasic.BasicStrategy((email, password, cb) =>
    User.findOne({ email }).then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return cb(null, false, { message: 'Incorrect email or password' });
        }
        return cb(null, user, { message: 'Successful login' });
    }).catch(err => cb(err))
));

passport.use(new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}, (jwt, cb) => User.findOne({ _id: jwt._id })
    .then(user => cb(null, user))
    .catch(err => cb(err))
));