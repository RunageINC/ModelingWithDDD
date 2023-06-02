import Product from '../../../domain/entity/product';

describe('product unit test', () => {
  it('should throw an error if the product id is empty', () => {
    const expectedErrorMessage = 'Product id is required';

    expect(() => {
      const product = new Product('', 'product', 100.0);
    }).toThrow(expectedErrorMessage);
  });

  it('should throw an error if the product name is empty', () => {
    const expectedErrorMessage = 'Product name is required';
    expect(() => {
      const product = new Product('12', '', 100.0);
    }).toThrow(expectedErrorMessage);
  });

  it('should throw an error if the product price is lower than or 0', () => {
    const expectedErrorMessage =
      'Product price is required and must be greater than 0';
    expect(() => {
      const product = new Product('12', 'product', -100.0);
    }).toThrow(expectedErrorMessage);
  });

  it('should change name and price', () => {
    const product = new Product('12', 'product', 100.0);
    expect(product.name).toBe('product');
    expect(product.price).toBe(100.0);

    product.changeName('new product');
    expect(product.name).toBe('new product');

    product.changePrice(200.0);
    expect(product.price).toBe(200.0);
  });
});
