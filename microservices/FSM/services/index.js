const fsmController = require('../controllers/index');

// eslint-disable-next-line func-names
module.exports = function () {
  const seneca = this;
  seneca.add({ role: 'packet', cmd: 'send' }, fsmController.trade);
};