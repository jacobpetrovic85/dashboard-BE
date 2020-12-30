// const DB = require('./dummyDatabase');
const fs = require('fs');
const R = require('Ramda');


let stringifyData = db => {
  return JSON.stringify(db);
};

let parseDB = db => {
  return db.map(obj => JSON.parse(obj));
};

let parseData = data => {
  return JSON.parse(data);
};
let makeNewArr = (data,DB) => {
  return R.compose(
    R.append(data),
    R.prop('dailyHours'))
  (DB);
};

let writeFile = (file,data,DB) => {
  let newArr = makeNewArr(data, DB);
  let lens = R.lens(R.prop('dailyHours'), R.assoc('dailyHours'));
  let newDB = R.set(lens, newArr, DB);
  return fs.writeFile(file, stringifyData(newDB), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync(file, "utf8"));
    }
  });
};

module.exports = writeFile;
