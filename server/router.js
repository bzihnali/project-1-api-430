const endpoints = require('./endpoints');
const api = require('./endpoints/api');

const router = (app) => {
    app.get('/', endpoints.index);
    app.get('/dex', api.getFilteredDex);
    app.get('/api/id/:id/get', api.getID);
    app.get('/api/id/:id/set', api.setID);
    app.get('/*', endpoints.notFound);

};

module.exports = router;