const BaseEntity = require('./BaseEntity');

module.exports = class TruewrecksUser extends BaseEntity {
  constructor() {
    super();
    this.collectionName = 'truewrecks_user';
  }

  async findTruewrecksUserById(id) {
    return this.findById(this.collectionName, id);
  }

  async createTruewrecksUser(user) {
    return this.insertElement(this.collectionName, user);
  }

  async addTrueCoins(id, coins) {
    const user = await this.findTruewrecksUserById(id);
    console.log(user);
    if (user === null) {
      throw new Error(`Couldn't find user with id ${id}`);
    }
    return this.updateById(this.collectionName, id, { truecoins: user.truecoins + coins });
  }
};
