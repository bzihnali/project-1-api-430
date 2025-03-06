const endpoints = require('./endpoints');
const api = require('./endpoints/api');

const router = (app) => {
    // I know technically there are only 3 gets and 1 set, but the id'ed get and set commands are very robust
    // The get and set can handle query values, and they can also take an ID as a path (/api/id/1/get gets the bulbasaur entry)
    app.get('/', endpoints.index);
    app.get('/dex', api.getFilteredDex);
    app.get('/api/id/:id/get', api.getID);
    app.post('/api/id/:id/set', api.setID);
    app.get('/*', endpoints.notFound);

};

module.exports = router;