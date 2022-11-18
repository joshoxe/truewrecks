const { MongoClient } = require('mongodb');

module.exports = class BaseEntity {
  constructor() {
    this.database = 'truewrecks';
    this.client = new MongoClient(process.env.DATABASE_URI);
  }

  async findElementByQuery(collectionName, query) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.findOne(query, {}).then(() => db.close());
  }

  async findandUpdateElementByQuery(collectionName, query, update) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.findOneAndUpdate(query, update, {}).then(() => db.close());
  }

  async findById(collectionName, id) {
    const query = { id };
    return this.findElementByQuery(collectionName, query);
  }

  async updateById(collectionName, id, update) {
    const query = { id };
    return this.findandUpdateElementByQuery(collectionName, query, { $set: update });
  }

  async insertElement(collectionName, document) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.insertOne(document, {}).then(() => db.close());
  }

  async deleteElement(collectionName, document) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.deleteOne(document, {}).then(() => db.close());
  }
};
