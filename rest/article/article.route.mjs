import * as controller from './article.controller.mjs';
import passport from 'passport';

export default (app) => {

    app.post('/articles', passport.authenticate('jwt', { session: false }), controller.create);

    app.get('/articles', passport.authenticate('jwt', { session: false }), controller.findAll);

    app.put('/articles/:id', passport.authenticate('jwt', { session: false }), controller.update);

    app.delete('/articles/:id', passport.authenticate('jwt', { session: false }), controller.deleteById);
}