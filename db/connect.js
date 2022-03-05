const mongoose = require('mongoose');

const connect = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log('CONNECTED TO THE DB...'))
    .catch((err) => console.log(err));
}

module.exports = connect;