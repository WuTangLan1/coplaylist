const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Serve your static sites
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// Let's ensure the SPA's routing works correctly for any routes
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server started on port ' + port);
