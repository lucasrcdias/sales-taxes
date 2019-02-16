const receiptPrinter = require('./../receiptPrinter');

describe('productsParser', () => {
  const products = [
    { label: 'imported bottle of perfume', quantity: 1, taxes: 4.2, totalPrice: 32.19 },
    { label: 'bottle of perfume', quantity: 1, taxes: 1.9, totalPrice: 20.89 },
    { label: 'packet of headache pills', quantity: 1, taxes: 0, totalPrice: 9.75 },
    { label: 'box of imported chocolates', quantity: 3, taxes: 1.7, totalPrice: 35.45 },
  ];

  it('returns formatted receipt', () => {
    const result = receiptPrinter(products);
    const expected = `1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 box of imported chocolates: 35.45
Sales Taxes: 7.80
Total: 98.28`;

    expect(result).toEqual(expected)
  });
});
