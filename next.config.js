const path = require('path');
const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    staging: prod ? 'https://rib-production.ruanginsanberbagi.org/' : 'https://58d4affe254a.ngrok.io/',
    baseUrl: prod ? 'https://ruanginsanberbagi.org/' : 'http://4068a9add13b.ngrok.io/'
  },
  externals: {
    'react': 'React'
  }
};