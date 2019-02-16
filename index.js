const fs = require('fs');
const { parseFileContent } = require('./src/productsParser');
const receiptPrinter = require('./src/receiptPrinter');

if (process.argv.length < 3) {
  console.log('Usage: node index.js [filename]');
  process.exit(1);
}

const filename = process.argv[2];

fs.readFile(filename, 'utf-8', (error, data) => {
  if (error) throw error;

  const products = parseFileContent(data);
  console.log(receiptPrinter(products));
});
