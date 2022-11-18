const { MongoClient } = require('mongodb');

module.exports = class BaseEntity {
  constructor() {
    this.database = 'truewrecks';
  }

  async findElementByQuery(collectionName, query) {
    const client = new MongoClient(process.env.DATABASE_URI);
    let result;

    try {
      const db = await client.db(this.database);
      const collection = db.collection(collectionName);
      result = await collection.findOne(query, {});
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    return result;
  }

  async findandUpdateElementByQuery(collectionName, query, update) {
    const client = new MongoClient(process.env.DATABASE_URI);
    let result;

    try {
      const db = await client.db(this.database);
      const collection = db.collection(collectionName);
      result = await collection.findOneAndUpdate(query, update, {});
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    return result;
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
    const client = new MongoClient(process.env.DATABASE_URI);
    let result;

    try {
      const db = await client.db(this.database);
      const collection = db.collection(collectionName);
      result = await collection.insertOne(document, {});
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    return result;
  }

  async deleteElement(collectionName, document) {
    const client = new MongoClient(process.env.DATABASE_URI);
    let result;

    try {
      const db = await this.client.db(this.database);
      const collection = db.collection(collectionName);
      result = await collection.deleteOne(document, {});
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    return result;
  }
};
