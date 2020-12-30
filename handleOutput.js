let parseDB = db => {
  return db.map(obj => JSON.parse(obj));
};

let handleOutput = {
  outputData: data => {
    return (
      {data: data}
    );
  },
  // outputDB: data => {
  //   console.log("data = ", data);
  //   return (
  //     {data: parseDB(data)}
  //   );
  // },
    outputDB: data => {
    return (
      {data: data}
    );
  },
  findId: db => id => {
    return db.dailyHours.find(day => day.id === id);
  }
};

module.exports = handleOutput;
