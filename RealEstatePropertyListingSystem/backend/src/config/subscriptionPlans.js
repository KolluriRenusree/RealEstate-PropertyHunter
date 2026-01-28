// backend/src/config/subscriptionPlans.js

module.exports = {
  free: {
    maxProperties: 1,
    durationDays: null // no expiry
  },

  basic: {
    maxProperties: 5,
    durationDays: 30
  },

  premium: {
    maxProperties: Infinity,
    durationDays: 30
  }
};
