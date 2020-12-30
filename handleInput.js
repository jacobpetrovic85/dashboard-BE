const R = require('Ramda');

let checkUniqueId = db => id => db.filter(c => c.id === id).length === 0;
let checkLength = str => R.length(str) <= 26;

let isValid = (db) => (hoursCandidate) => {
  let checks = [
    str => checkUniqueId(db)(str.id),
    str => checkLength(str.day)
  ];
  return checks.reduce((acc, v) => {
    return acc && v(hoursCandidate);
  }, true);
};

module.exports = isValid;
