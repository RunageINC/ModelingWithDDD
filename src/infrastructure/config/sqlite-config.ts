import { Sequelize, Model } from 'sequelize-typescript';

export default class SqlInMemDbProvider {
  private _db: Sequelize | undefined;

  initializeDb() {
    this._db = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {
        force: true,
      },
    });
  }

  closeConnection() {
    this._db?.close();
  }

  async synchronize() {
    if (!this._db) {
      throw new Error('Database not initialized');
    }

    this._db.sync();
  }

  get db(): Sequelize {
    if (!this._db) {
      throw new Error('SqlInMemoryDb not initialized');
    }

    return this._db;
  }
}
