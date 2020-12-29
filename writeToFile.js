const DB = require('./dummyDatabase');
const fs = require('fs');

let stringifyDB = db => {
  return db.map(obj => JSON.stringify(obj));
};

let parseDB = db => {
  return db.map(obj => JSON.parse(obj));
};

let parseData = data => {
  return JSON.parse(data);
};

let writeFile = db => (file,data) => {
  let strDB = stringifyDB(DB);
  console.log("strDB = ", strDB);
  let newDB = [...DB, parseData(data)];
  console.log("newDB = ", newDB);

  return fs.writeFile(file, `let dailyHours = [${newDB}]; module.exports = dailyHours;`, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync(file, "utf8"));
    }
  });
};

module.exports = writeFile(DB);
