module.exports = function(error) {
  assert.isAbove(error.message.indexOf('VM Exception'), -1, 'Invalid JUMP error must be returned. Got message:' + error.message);
}
