const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("./server_conf/server.key"),
  cert: fs.readFileSync("./server_conf/server.cert"),
};

const app = express();

// Default route for server status
app.use(express.static(path.join(__dirname, "./build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "./build/index.html"));
});

// Create an HTTP server.
// http.createServer(app).listen(HTTP_PORT);
app.listen(HTTP_PORT, () => {
  console.log("잘된다.");
});

// Create an HTTPS server.
// https.createServer(options, app).listen(HTTPS_PORT);
