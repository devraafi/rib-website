const path = require('path');
const prod = process.env.NODE_ENV === 'production';
console.log(prod);
module.exports = {
  env: {
    staging: prod ? 'https://rib-production.ruanginsanberbagi.org/' : 'https://staging-rib.herokuapp.com/'
  },
  externals: {
    'react': 'React'
  }
};