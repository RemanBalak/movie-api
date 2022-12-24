// URL import
const url = require('url');
const myURL = '#';
const parsedURL = url.parse(myURL);

console.log(parsedURL);

//HTTP import
const http = require('http');

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello Node!\n');
  })
  .listen(8080);

console.log('My first Node test server is running on Port 8080.');
