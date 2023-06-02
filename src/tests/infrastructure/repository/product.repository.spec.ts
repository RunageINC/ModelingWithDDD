import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/entity/product';

import ProductModel from '../../../infrastructure/db/sequelize/model/product.model';
import ProductRepository from '../../../infrastructure/repository/product.repository';

describe('Product repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 1',
      price: 10,
    });
  });

  it('should update product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 1',
      price: 10,
    });

    product.changeName('product 2');
    product.changePrice(20);

    await productRepository.update(product);

    const updated = await ProductModel.findOne({ where: { id: '1' } });

    expect(updated.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 2',
      price: 20,
    });
  });

  it('should find product by id', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    const foundProduct = await productRepository.find(productModel.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it('should delete product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 10);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 1',
      price: 10,
    });

    await productRepository.delete(product.id);

    const deletedProductModel = await ProductModel.findOne({
      where: { id: '1' },
    });

    expect(deletedProductModel).toBeNull();
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();

    const product = new Product('1', 'product 1', 10);
    await productRepository.create(product);
    const product2 = new Product('2', 'product 2', 20);
    await productRepository.create(product2);
    const product3 = new Product('3', 'product 3', 30);
    await productRepository.create(product3);
    const product4 = new Product('4', 'product 4', 40);
    await productRepository.create(product4);

    const products = await ProductModel.findAll();
    const foundProducts = await productRepository.findAll();

    expect(products.length).toBe(4);
    expect(products[0].toJSON()).toStrictEqual({
      id: foundProducts[0].id,
      name: foundProducts[0].name,
      price: foundProducts[0].price,
    });
  });
});
