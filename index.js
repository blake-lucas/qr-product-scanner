const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
app.use(express.static(__dirname + '/static'));

// Read the configuration file
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));

// Set config properties
const ip = config.ip
const port = config.port

app.listen(port, ip, () => console.log(`QR scanner thing listening at http://${ip}:${port}`));