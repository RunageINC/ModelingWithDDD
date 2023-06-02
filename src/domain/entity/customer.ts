import Address from './address';

export default class Customer {
  private _id: string;
  private _name: string;

  private _address: Address | undefined;

  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('ID not informed, and it is required');
    }

    if (this._name.length === 0) {
      throw new Error('Name not informed, and it is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error('Address not initialized, and it is required');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(rewardPoints: number) {
    this._rewardPoints += rewardPoints;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  get address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }
}
