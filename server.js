const express = require('express');
const http = require('http')
const path = require('path');
var fs = require('fs');




const app = express();

app.use(express.static(path.join(__dirname, '')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

if(!process.env.ADDRESS) process.env.ADDRESS = "127.0.0.1";

var ip_addresses = process.env.ADDRESS.split(",");

const server = http.createServer(app);
server.listen(port,ip_addresses,() => console.log(`running on  ${port}`));