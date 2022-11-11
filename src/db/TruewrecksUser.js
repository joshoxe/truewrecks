const BaseEntity = require('./BaseEntity');

module.exports = class TruewrecksUser extends BaseEntity {
  constructor() {
    super();
    this.collectionName = 'truewrecks_user';
  }

  findTruewrecksUserById(id) {
    return this.findById(this.collectionName, id);
  }
};
