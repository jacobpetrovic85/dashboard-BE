let parseDB = db => {
  return db.map(obj => JSON.parse(obj));
};

let handleOutput = {
  outputData: data => {
    return (
      {data: data}
    );
  },
  outputDB: data => {
    return (
      {data: parseDB(data)}
    );
  },
  findId: db => id => {
    return db.find(day => day.id === id);
  }
};

module.exports = handleOutput;
