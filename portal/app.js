#!/usr/bin/env node

"use strict";

const express = require("express");
const path = require("path");

var PORT = 8081;

var app = express();
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(PORT);

console.log(`Server is listening on ${PORT}`);