const { EXEMPTION_KEYWORDS } = require('./constants');

const checkProductExemption = (product) => {
  const productKeywords = EXEMPTION_KEYWORDS.filter((keyword) => (
    product.includes(keyword)
  ));

  return productKeywords.length > 0;
};

const calculateProductTaxes = (line, totalPrice) => {
  const isImported   = line.includes('imported');
  const hasExemption = checkProductExemption(line);

  let tax = 0;

  if (!hasExemption) tax += 0.1;
  if (isImported)    tax += 0.05;

  const priceWithTaxes = totalPrice * tax;
  return Math.round(priceWithTaxes * 20) / 20;
};

const parseProduct = (line) => {
  const splittedLine = line.split(' ');

  const price    = parseFloat(splittedLine[splittedLine.length - 1]);
  const quantity = parseInt(splittedLine[0]);
  const label    = splittedLine.slice(1, splittedLine.length - 2).join(' ');

  const totalPrice          = quantity * price;
  const taxes               = calculateProductTaxes(line, totalPrice);
  const totalPriceWithTaxes = totalPrice + taxes;
  const roundedPrice        = Math.round(totalPriceWithTaxes * 100) / 100;

  return {
    label,
    quantity,
    taxes: taxes,
    totalPrice: roundedPrice,
  };
};

const parseFileContent = (content) => {
  let lines = content.split(/\n/);
  lines = lines.filter((line) => !!line);

  if (!lines.length) return [];

  return lines.map(parseProduct);
};

module.exports = {
  checkProductExemption,
  calculateProductTaxes,
  parseProduct,
  parseFileContent,
};
