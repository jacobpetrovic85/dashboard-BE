const R = require('Ramda');
var UUID = require('uuid-js');

let createUUID = () => {
  var uuid4 = UUID.create();
  return uuid4.toString();
};

let makeInputWithUUID = (UUID, input) => {
  return R.assoc('id', UUID, input);
};

let GUID = R.curry(makeInputWithUUID)(createUUID());

module.exports = GUID;
