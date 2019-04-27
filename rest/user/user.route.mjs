import * as controller from './user.controller.mjs';
import passport from 'passport';

export default (app) => {

    app.post('/users', passport.authenticate('jwt', { session: false }), controller.create);

    app.get('/users', passport.authenticate('jwt', {session: false}), controller.findAll);

    app.put('/users/:id', passport.authenticate('jwt', {session: false}), controller.update);

    app.delete('/users/:id', passport.authenticate('jwt', {session: false}), controller.deleteById);
}