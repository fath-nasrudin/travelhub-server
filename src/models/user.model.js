const { mongoose } = require('../config/db');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: 'user',
  },
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  password: String,
  linkedToGoogle: {
    type: Boolean,
    default: false,
  },
  googleUserId: String,
  picture: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.virtual('name')
  .get(function () {
    if (this.lastName) return `${this.firstName} ${this.lastName}`;
    return `${this.firstName}`;
  });

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
// .set(function (v) {
//   // `v` is the value being set, so use the value to set
//   // `firstName` and `lastName`.
//   const firstName = v.substring(0, v.indexOf(' '));
//   const lastName = v.substring(v.indexOf(' ') + 1);
//   this.set({ firstName, lastName });
// });

module.exports = mongoose.model('User', userSchema);

// need password resetter
// source: google, twitter, facebook?
// how to connect to gmail?

// when user was register by email. connect to gmail
// user have password or can use gmail.

// how to handle
// email already registed with google
// generic email try to register too
// generic email try to login

// email already registed with generic signup
// try to register with google
// user try to login with google
