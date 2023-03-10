//HTTP import
const url = require('url');
const fs = require('fs');
const http = require('http');
const PORT = process.env.PORT || 8080;

http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = '';
    fs.appendFile(
      'log.txt',
      `URL: ${addr} Timestamp: ${new Date()} \n`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/Documentation.html';
    } else {
      filePath = 'index.html';
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  })
  .listen(PORT);
console.log(`My test server is running on Port ${PORT}.`);


