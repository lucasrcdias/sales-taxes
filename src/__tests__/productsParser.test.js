const productsParser = require('./../productsParser');

describe('productsParser', () => {
  describe('checkProductExemption', () => {
    it('check if product label includes one of exemption keywords', () => {
      expect(productsParser.checkProductExemption('1 book at 10.50')).toBe(true);
      expect(productsParser.checkProductExemption('1 chocolate at 10.50')).toBe(true);
      expect(productsParser.checkProductExemption('1 headache at 10.50')).toBe(true);
      expect(productsParser.checkProductExemption('1 headache pills at 10.50')).toBe(true);

      expect(productsParser.checkProductExemption('1 perfume at 10.50')).toBe(false);
      expect(productsParser.checkProductExemption('1 music CD at 10.50')).toBe(false);
    });
  });

  describe('calculateProductTaxes', () => {
    const price = 14.68;

    describe('when product has exemption and is not imported', () => {
      const product = '1 book';

      it('returns 0', () => {
        expect(productsParser.calculateProductTaxes(product, price)).toBe(0);
      });
    });

    describe('when product is neither imported nor exempted', () => {
      const product = '1 music CD';

      it('returns 10% of product\'s price', () => {
        expect(productsParser.calculateProductTaxes(product, price)).toBe(1.45);
      });
    });

    describe('when product is imported and has exemption', () => {
      const product = '1 imported book';

      it('returns 5% of product\'s price', () => {
        expect(productsParser.calculateProductTaxes(product, price)).toBe(0.75);
      });
    });

    describe('when product is imported and has no exemption', () => {
      const product = '1 imported music CD';

      it('returns 15% of product\'s price', () => {
        expect(productsParser.calculateProductTaxes(product, price)).toBe(2.2);
      });
    });
  });

  describe('parseProduct', () => {
    const line = '2 imported bottle of perfume at 27.99';

    it('returns product object', () => {
      const result = productsParser.parseProduct(line);

      expect(result).toMatchObject({
        label: 'imported bottle of perfume',
        quantity: 2,
        taxes: 8.4,
        totalPrice: 64.38,
      });
    });
  });

  describe('parseFileContent', () => {
    const data = "1 imported bottle of perfume at 27.99\n" +
    "1 bottle of perfume at 18.99\n" +
    "1 packet of headache pills at 9.75\n" +
    "3 box of imported chocolates at 11.25";

    it('returns array of products', () => {
      const result = productsParser.parseFileContent(data);

      expect(result).toHaveLength(4);
      expect(result).toEqual(expect.arrayContaining([
        { label: 'imported bottle of perfume', quantity: 1, taxes: 4.2, totalPrice: 32.19 },
        { label: 'bottle of perfume', quantity: 1, taxes: 1.9, totalPrice: 20.89 },
        { label: 'packet of headache pills', quantity: 1, taxes: 0, totalPrice: 9.75 },
        { label: 'box of imported chocolates', quantity: 3, taxes: 1.7, totalPrice: 35.45 },
      ]));
    })
  });
});
