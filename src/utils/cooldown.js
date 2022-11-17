const { addSeconds } = require('date-fns');

module.exports = class Cooldown {
  constructor() {
    this.cooldowns = {};
  }

  addCooldown(id) {
    this.cooldowns[id] = addSeconds(new Date(), 1);
  }

  hasCooldown(id) {
    return this.cooldowns[id] >= new Date();
  }
};
