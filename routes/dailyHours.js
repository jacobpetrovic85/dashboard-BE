const express = require('express');
const router = express.Router();
const R = require('Ramda');
const fs = require('fs');
const writeFile = require('../writeToFile');
const handleOutput =  require('../handleOutput.js');
const DB = require('../dummyTESTDatabase.json');
const isValid = require('../handleInput');
const GUID = require('../GUID.js');

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
  // let UUID = createUUID();
  // let newEntry = makeInputWithUUID(req.body, UUID);
  let newEntry = GUID(req.body);
  // if (isValid(newEntry)) {
  //   console.log('Valid!');
  //   console.log("newEntry = ", newEntry);
  //   // writeFile('dummyTESTDatabase.json',body, DB);
  // } else {
  //   console.log('not Valid');
  // }
  // id = Number(id);
  try {
    if (isValid(newEntry)) {
      console.log('Valid!');
      console.log("newEntry = ", newEntry);
      writeFile('dummyTESTDatabase.json',newEntry, DB);
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


module.exports = router;

/*
  Dummy curl POST req:
  curl -X POST -H "Content-Type: application/json" \
    -d '{"id": 4, "day": "31th December 2020 - 10:10", "hours": 1}' \
    localhost:3001/dailyHours/upload
  */
