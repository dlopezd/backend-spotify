const config = require('config');
const express = require('express');
const http = require('http');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = express();

const routerAlbum = require('./routes/album');
server.use(routerAlbum);

const serverHttp = http.createServer(server);
server.use(express.json());

serverHttp.listen(3000, () => {
  const host = serverHttp.address().address;
  const port = serverHttp.address().port;
  console.log('Server run at http://%s:%s', host, port);
});

