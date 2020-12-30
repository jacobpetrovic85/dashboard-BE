const R = require('Ramda');

let isValid = (db) => (entry, isOrIsNot) => {
  let checks = [
    str => isOrIsNot(R.compose(
      R.equals(0),
      R.length,
      R.filter(entry => entry.id === str.id),
      R.prop('dailyHours')
    )(db)),
    str => R.compose(R.equals(26), R.length, R.prop('day'))(str),
    str => R.propIs(String, 'id', str),
    str => R.propIs(String, 'day', str),
    str => R.propIs(String, 'hours', str)
  ];
  return checks.reduce((acc, v) => {
    return acc && v(entry);
  }, true);
};

module.exports = isValid;
