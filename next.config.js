const path = require('path');
const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    staging: prod ? 'https://rib-production.ruanginsanberbagi.org/' : 'https://rib-production.ruanginsanberbagi.org/',
    baseUrl: prod ? 'https://ruanginsanberbagi.org' : 'https://rib-website.vercel.app'
  },
  externals: {
    'react': 'React'
  }
};