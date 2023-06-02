export default class Address {
  _street: string;
  _number: number;
  _city: string;
  _state: string;
  _zip: string;
  _country: string;
  _latitude: number;
  _longitude: number;

  constructor(
    street: string,
    number: number,
    city: string,
    state: string,
    zip: string,
    country: string,
    latitude: number,
    longitude: number
  ) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._country = country;
    this._latitude = latitude;
    this._longitude = longitude;
    this.validate();
  }

  validate() {
    if (!this._street || this._street.length === 0) {
      throw new Error('Street is required and cannot be empty');
    }

    if (!this._number) {
      throw new Error('Number is required and cannot be empty');
    }

    if (!this._city || this._city.length === 0) {
      throw new Error('City is required and cannot be empty');
    }

    if (!this._state || this._state.length === 0) {
      throw new Error('State is required and cannot be empty');
    }

    if (!this._zip || this._zip.length === 0) {
      throw new Error('Zip is required and cannot be empty');
    }

    if (!this._country || this._country.length === 0) {
      throw new Error('Country is required and cannot be empty');
    }

    if (!this._latitude || isNaN(this._latitude)) {
      throw new Error('Latitude is required and cannot be empty');
    }

    if (!this._longitude || isNaN(this._longitude)) {
      throw new Error('Longitude is required and cannot be empty');
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city}, ${this._state}, ${this._zip}`;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }
}
