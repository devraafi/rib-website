const path = require('path');
const prod = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    staging: prod ? 'https://rib-production.ruanginsanberbagi.org/' : 'https://rib-production.ruanginsanberbagi.org/',
    baseUrl: prod ? 'https://rib-website-green.vercel.app/' : 'https://rib-website-green.vercel.app/'
  },
  externals: {
    'react': 'React'
  }
};