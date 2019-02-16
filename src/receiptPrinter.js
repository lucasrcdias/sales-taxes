const receiptPrinter = (products) => {
  const totalPriceSum = products.reduce((acc, cur) => (acc + cur.totalPrice), 0);
  const taxes = products.reduce((acc, cur) => (acc + cur.taxes), 0);

  products = products.map((product) => {
    const { quantity, label, totalPrice } = product;

    return `${quantity} ${label}: ${totalPrice.toFixed(2)}`;
  }).join('\n');

  return `${products}
Sales Taxes: ${taxes.toFixed(2)}
Total: ${totalPriceSum}`;
};

module.exports = receiptPrinter;
