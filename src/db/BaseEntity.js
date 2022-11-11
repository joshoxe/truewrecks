const { MongoClient } = require('mongodb');

module.exports = class BaseEntity {
  constructor() {
    this.database = 'truewrecks';
    this.client = new MongoClient(process.env.DATABASE_URI);
  }

  async findElementByQuery(collectionName, query) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.findOne(query, {});
  }

  async findandUpdateElementByQuery(collectionName, query, update) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.findOneAndUpdate(query, update, {});
  }

  async findById(collectionName, id) {
    const query = { id: id };
    return this.findElementByQuery(collectionName, query);
  }

  async updateById(collectionName, id, update) {
    const query = { id: id };
    return this.findandUpdateElementByQuery(collectionName, id, update);
  }

  async insertElement(collectionName, document) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.insertOne(document, {});
  }

  async deleteElement(collectionName, document) {
    const db = await this.client.db(this.database);
    const collection = db.collection(collectionName);
    return collection.deleteOne(document, {});
  }
};
