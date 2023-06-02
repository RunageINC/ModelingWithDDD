export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (!this._id || this._id.length === 0) {
      throw new Error('Product id is required');
    }

    if (!this._name || this._name.length === 0) {
      throw new Error('Product name is required');
    }

    if (!this._price || this._price <= 0) {
      throw new Error('Product price is required and must be greater than 0');
    }

    return true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
