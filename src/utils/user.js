const TruewrecksUser = require('../db/TruewrecksUser');

module.exports = class User {
  constructor(user) {
    this.user = user;
    this.truewrecksUser = new TruewrecksUser();
  }

  async findOrCreateUser() {
    try {
      let mongoUser = await this.truewrecksUser.findTruewrecksUserById(this.user.id);

      if (mongoUser === null) {
        mongoUser = await this.truewrecksUser.createTruewrecksUser({
          ...this.user,
          truecoins: 100,
        });
      }

      return mongoUser;
    } catch (e) {
      console.error(e);
    }

    return {};
  }

  async addTruecoins(coins) {
    try {
      await this.truewrecksUser.addTrueCoins(this.user.id, coins);
    } catch (e) {
      console.error(e);
    }
  }

  async getTruecoins() {
    try {
      const user = await this.truewrecksUser.findTruewrecksUserById(this.user.id);
      return user.truecoins;
    } catch (e) {
      console.log(e);
    }

    return 0;
  }
};
