//jshint esversion: 6

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const PORT = process.env.PORT || 3000;

// const resourceMapping = {
//   '/helium' : 'public/helium.html',
//   '/hydrogen' : 'public/hydrogen.html'
// };

const sendContent = (res, content) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(content);
  res.end();
};

// const fileNotFoundErrorHandler = (res) => {
//       res.statusCode = 500;
//       res.end('Server is broken');
//     };

const server = http.createServer( (req, res)  => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  console.log('req.headers', req.headers);



  console.log('hello');

  if(req.method === 'GET'){
    console.log('index', req.url);
    if(req.url === '/index.html'){
    fs.readFile('./public/index.html', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('index stuff', req.url);
        sendContent(res, 'Resource not found');
        return;
      }
      sendContent(res, content);
    });

    }else if(req.url === '/helium.html'){
      fs.readFile('./public/helium.html', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('helium stuff', req.url);
        sendContent(res, 'Resource not found');
        return;
      }
      sendContent(res, content);
    });

    }else if(req.url === '/hydrogen.html'){
      fs.readFile('./public/hydrogen.html', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('hydrogen stuff', req.url);
        sendContent(res, 'Resource not found');
        return;
      }
      sendContent(res, content);
    });

    }else if(req.url === '/styles.css'){
      fs.readFile('./public/css/styles.css', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('css stuff', req.url);
        sendContent(res, 'Resource not found');
        return;
      }
      res.setHeader('Content-Type', 'text/css');
      res.write(content);
      res.end();
    });

    }

    }

    let reqBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
    reqBody += chunk;
    });
    req.on('end', () =>{
      let bodyParse = qs.parse(reqBody);
     if(req.method === 'POST' && req.url === '/elements'){
      fs.writeFile(`./public/${bodyParse.elementName}.html`,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${bodyParse.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${bodyParse.elementName}</h1>
  <h2>${bodyParse.elementSymbol}</h2>
  <h3>${bodyParse.elementAtomicNumber}</h3>
  <p>${bodyParse.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`);
  res.setHeader('Content-Type', 'application/json');

  res.write(`{"success": true }`);
  res.end();
  }

    });




  });
 

server.listen(PORT, () =>{
  console.log('server listening on port', PORT);
});