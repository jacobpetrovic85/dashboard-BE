const express = require("express");
const router = express.Router();
let dailyHours = require("../dummyDatabase");
console.log("dailyHours = ", dailyHours);

router.get("/list", async (req, res) => {
  console.log("req = ", req);
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

module.exports = router;
