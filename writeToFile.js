const fs = require('fs');

let data = "This is a file containing a collection of books.";

let writeFile = (file,data,db) => {
  return fs.writeFile(file, data, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("books.txt", "utf8"));
    }
  });
};

module.exports = writeFile;
