module.exports = function(error) {
  assert.isAbove(error.message.indexOf('of gas'), -1, 'Out of gas error must be returned. Got message:' + error.message);
}
