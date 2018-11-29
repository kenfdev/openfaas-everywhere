'use strict';

const axios = require('axios');

module.exports = async (context, callback) => {
  const query = process.env.Http_Query;

  let q = '';
  if (query) {
    const year = query.split('=')[1];
    q += `+created:${year}-01-01..${year}-12-31`;
  }
  const result = await axios.get(
    `https://api.github.com/search/repositories?per_page=1&type=Repositories&q=language%3Anode${q}`,
    {
      headers: {
        Authorization: `token ${process.env.TOKEN}`,
      },
    }
  );

  const logoUrl =
    'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png';
  callback(undefined, {
    language: 'Node.js',
    count: result.data.total_count,
    logoUrl,
  });
};
