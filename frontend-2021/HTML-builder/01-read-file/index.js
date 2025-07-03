const { createReadStream } = require('fs');
const { join } = require('path');

createReadStream(join(__dirname, 'text.txt')).on('data', data => console.log(data.toString()));
