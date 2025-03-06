const express = require('express')
const bp = require('body-parser');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const app = express()

// Creates a router where all requests are routed to
const router = require('./router.js');

// Adds middleware that the Express app can use
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(express.static('public'));

router(app);

app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${port}`);
});