const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.cert"),
};

const app = express();

// Default route for server status
app.get("/", (req, res) => {
  res.json({
    message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}`,
  });
});

// Create an HTTP server.
http.createServer(app).listen(HTTP_PORT);

// Create an HTTPS server.
https.createServer(options, app).listen(HTTPS_PORT);
