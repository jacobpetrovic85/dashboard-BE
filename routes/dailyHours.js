const express = require('express');
const router = express.Router();
const R = require('Ramda');
const fs = require('fs');
const writeFile = require('../writeToFile');
const deleteEntry = require('../deleteEntry');
const handleOutput =  require('../handleOutput.js');
const DB = require('../db.json');
const isValid = require('../handleInput');
const GUID = require('../GUID.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');

// GET API
let getApiObj = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
    'Accept-Encoding': 'gzip'
  }
};
// TODO factor out
function handleResponse () {
  return this.responseText;
}
let formatURL = (url, obj) => {
  let newUrl = new URL(url).toString();
  let params = new URLSearchParams(obj).toString();
  return newUrl + '?' + params;
};

let xmlNoCorsRequests = async (obj, url, res) => { // TODO refactor to fetch
  var xhr = new XMLHttpRequest();
  let formattedUrl = formatURL(url, obj);
  xhr.open("GET", formattedUrl, true);
  xhr.setRequestHeader('Content-Type', 'application\/json');
  xhr.setRequestHeader('X-CMC_PRO_API_KEY', 'd9e29c8b-e083-4337-a278-668aa1689477');
  // 4. This will be called after the response is received
  xhr.send();
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        res.status(200).send(handleOutput.outputData(JSON.parse(xhr.responseText))); // response is the server response
      }
    };
};

router.get("/list", async (req, res) => {
  try {
    res.status(200).json(handleOutput.outputDB(DB));
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/calling/params", async (req, res) => {
  console.log("req = ", req.query);
  let { query } = req.query;
  try {
    xmlNoCorsRequests(req.query, 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', res);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    res.status(200).json(handleOutput.outputData(handleOutput.findId(DB)(id)));
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post("/upload", async (req, res) => {
  let newEntry = GUID(req.body);
  console.log('req.body = ', req.body);
  try {
    if (isValid(DB)(newEntry,R.identity)) {
      console.log('Valid!');
      console.log("newEntry = ", newEntry);
      writeFile('db.json',newEntry, DB);
      return res.status(200).json({
        data: newEntry
      });
    } else {
      console.log('not Valid');
    }

  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.delete("/delete", async (req, res) => { // TODO debug
  let oldEntry = req.body;
  console.log("oldEntry = ", oldEntry);
  console.log("isValid(DB)(oldEntry,R.not) = ", isValid(DB)(oldEntry,R.not));
  try {
    if (isValid(DB)(oldEntry,R.not)) {
      console.log('Valid!');
      console.log("oldEntry = ", oldEntry);
      deleteEntry('db.json',oldEntry, DB);
      return res.status(200).json({
        data: oldEntry
      });
    } else {
      console.log('not Valid');
    }
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});



module.exports = router;
