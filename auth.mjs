import passport from 'passport';
import jwt from 'jsonwebtoken';

import * as config from './config.mjs';

export default (app) => {
    app.post('/auth', (req, res, next) => {
        passport.authenticate('basic', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: 'incorrect credentials' });
            } else {
                const token = jwt.sign(user.toObject({ transform: (doc, obj) => { delete obj.password; return obj; } }), config.secret);
                return res.status(200).send({ token: token });
            }
        })(req, res);
    }
    );
}