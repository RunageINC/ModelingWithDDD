import Product from '../../../domain/entity/product';
import ProductService from '../../../domain/service/product.service';

describe('Product service unit test', () => {
  it('should change the price of a product by a percentage', () => {
    const product1 = new Product('1', 'product 1', 10);
    const product2 = new Product('2', 'product 2', 20);

    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
