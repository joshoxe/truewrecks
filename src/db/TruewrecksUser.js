const BaseEntity = require('./BaseEntity');

module.exports = class TruewrecksUser extends BaseEntity {
  constructor() {
    super();
    this.collectionName = 'truewrecks_user';
  }

  async findTruewrecksUserById(id) {
    const user = await this.findById(this.collectionName, id);
    console.log(user);

    if (user === null) {
      throw new Error(`Couldn't find user with id ${id}`);
    }

    return user;
  }

  async createTruewrecksUser(user) {
    return this.insertElement(this.collectionName, user);
  }

  async addTrueCoins(id, coins) {
    const user = await this.findTruewrecksUserById(id);

    return this.updateById(this.collectionName, id, { truecoins: user.truecoins + coins });
  }
};
