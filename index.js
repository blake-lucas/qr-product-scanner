const { ManageAPI } = require('connectwise-rest');
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

const cwm = new ManageAPI({
    companyId: 'mcnallans',
    clientId: '<your client id>',
    companyUrl: 'api-na.myconnectwise.net',
    publicKey: '',
    privateKey: '',
    entryPoint: 'v2022.2',      // optional, defaults to 'v4_6_release'
    apiVersion: '3.0.0',        // optional, defaults to '3.0.0'
    timeout: 20000,             // optional, request connection timeout in ms, defaults to 20000
    retry: false,               // optional, defaults to false
    retryOptions: {             // optional, override retry behavior, defaults as shown
      retries: 4,               // maximum number of retries
      minTimeout: 50,           // number of ms to wait between retries
      maxTimeout: 20000,        // maximum number of ms between retries
      randomize: true,          // randomize delay between retries on timeouts
    },
    debug: false,               // optional, enable debug logging
    logger: (level, text, meta) => { } // optional, pass in logging function
  });

cwm.ServiceAPI.getServiceTicketsById(1234)
    .then((ticket) => { console.log(ticket.id, ticket.summary, ticket.status.name); })
    .catch((err) => { console.log(err); });

app.listen(port, ip, () => console.log(`QR scanner thing listening at http://${ip}:${port}`));