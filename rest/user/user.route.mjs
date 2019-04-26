import * as controller from './user.controller.mjs';

export default (app) => {

    app.post('/users', controller.create);

    app.get('/users', controller.findAll);

    app.put('/users/:id', controller.update);

    app.delete('/users/:id', controller.deleteById);
}