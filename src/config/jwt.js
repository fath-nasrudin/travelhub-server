module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    exp: process.env.JWT_EXP,
    iss: process.env.JWT_ISS,
  },
};
