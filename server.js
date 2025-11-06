const express = require("express");

const base = express();

const site = express.Router();

const conn = 2008;

module.exports = { express, base, site, conn}