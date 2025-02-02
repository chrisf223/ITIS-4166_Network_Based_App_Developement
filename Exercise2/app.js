const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');

    let path = './views/';

    if (req.url === '/') {
        path = path + 'index.html';
    } else if (req.url === '/contact') {
        path = path + 'contact.html';
    } else {
        res.statusCode = 404;
        path = path + '404.html';
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    });

});

server.listen(3000, 'localhost', () => {
  console.log('Server is running on http://localhost:3000');
});
