const express = require('express');
const router = express.Router();
const dailyHours = require('../dummyDatabase');
const R = require('Ramda');
const fs = require('fs');
const isValid = require("../handleInput");
const writeFile = require("../writeToFile");


router.get("/list", async (req, res) => {
  try {
    res.status(200).json({
      data: dailyHours
    });
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
    let day = dailyHours.find(day => day.id === id);
    console.log("day = ", day);
    res.status(200).json({
      data: day
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post("/upload", async (req, res) => {
  let body = req.body;
  console.log("body = ", body);
  if (isValid(dailyHours)(body)) {
    console.log('Valid!');
    writeFile('dummyTESTDatabase.js',body,dailyHours);
  } else {
    console.log('not Valid');
  }
  // id = Number(id);
  try {
    // let day = dailyHours.find(day => day.id === id);
    // console.log("day = ", day);
    res.status(200).json({
      data: body
    });
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
