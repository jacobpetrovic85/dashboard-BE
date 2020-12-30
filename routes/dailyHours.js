const express = require('express');
const router = express.Router();
const R = require('Ramda');
const fs = require('fs');
const writeFile = require('../writeToFile');
const deleteEntry = require('../deleteEntry');
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
  let newEntry = GUID(req.body);
  try {
    if (isValid(DB)(newEntry)) {
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

router.delete("/delete", async (req, res) => {
  let oldEntry = req.body;
  console.log("oldEntry = ", oldEntry);
  try {
    if (true) {
      console.log('Valid!');
      console.log("oldEntry = ", oldEntry);
      deleteEntry('dummyTESTDatabase.json',oldEntry, DB);
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

/*
  Dummy curl POST req:
  curl -X POST -H "Content-Type: application/json" \
    -d '{"id": 4, "day": "31th December 2020 - 10:10", "hours": 1}' \
    localhost:3001/dailyHours/upload
  */
