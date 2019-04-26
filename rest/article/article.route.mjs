import * as controller from './article.controller.mjs';

export default (app) => {

    app.post('/articles', controller.create);

    app.get('/articles', controller.findAll);

    app.put('/articles/:id', controller.update);

    app.delete('/articles/:id', controller.deleteById);
}