const { generateHTTPError } = require('../../utils/error');
const {
  hashData, compareData, generateJWTToken, googleVerify, generateAccessToken,
} = require('../../utils/auth');

const getUsers = (User) => async (options = {}) => {};

const getUserById = (User) => async (id, options = {}) => {};

// return user data or null if user not found
const getUserOne = (User) => async (filter = {}, options = {}) => {
  const user = await User.findOne(filter);
  return user;
};

const createUser = (User) => async (data, options = {}) => {
  let userData = data;
  const { email, password } = userData;

  if (!email) generateHTTPError(400, 'required properties are missing');

  // check is user with current email exist
  const userExist = await User.findOne({ email });
  if (userExist) generateHTTPError(400, 'user already exist');

  // hash password if password is provided
  if (password) {
    const hashedPassword = await hashData(password);
    userData = { ...data, password: hashedPassword };
  }

  const user = await User.create(userData);
  return user;
};

const editUser = (User) => async (id, data, options = {}) => {};

// delete a user
const deleteUser = (User) => async (id, options = {}) => {};

//  AUTHENTICATION //
const signin = (User) => async (data) => {
  const { email, password } = data;
  if (!email || !password) generateHTTPError(400, 'required properties are missing');

  // find the user
  const foundUser = await getUserOne(User)({ email });
  if (!foundUser) generateHTTPError(400, 'Wrong email or password');

  // match the password
  const isPasswordMatch = compareData(password, foundUser.password);
  if (!isPasswordMatch) generateHTTPError(400, 'Wrong email or password');

  const payload = {
    _id: foundUser._id,
    email: foundUser.email,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    name: foundUser.name,
    picture: foundUser.picture,

  };

  // generate token
  const token = generateAccessToken(payload);
  return token;
};

const signup = (User) => async (data) => {
  const { password, confirmPassword, email } = data;
  if (!email || !password || !confirmPassword) generateHTTPError(400, 'required properties are missing');

  if (password !== confirmPassword) generateHTTPError(400, 'Password didn\'t match');

  const user = await createUser(User)(data);
  return user;
};

const googleAuth = (User) => async (data) => {
  const { token } = data;
  if (!token) generateHTTPError(400, 'Google token required');

  // verify the token
  const payload = await googleVerify(token);

  // if the token wrong? i dont know what the return; let suppose payload getting falsy
  if (!payload) generateHTTPError(400, 'google token invalid');

  // check is the user with given email exist
  const userFound = await getUserOne(User)({ email: payload.email });

  // is the token linked to google?
  // if not, add google data to the email row.

  let dataPayload;
  if (userFound) {
    // do login
    const {
      _id, email, firstName, lastName, name, picture,
    } = userFound;

    dataPayload = {
      _id, email, firstName, lastName, name, picture,
    };
  } else {
    // do sign up
    const userData = {
      email: payload.email,
      googleUserId: payload.sub,

      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
      linkedToGoogle: true,
    };

    // regist the email
    const user = await createUser(User)(userData);

    // create jwt token
    const {
      _id, email, firstName, lastName, name, picture,
    } = user;
    dataPayload = {
      _id, email, firstName, lastName, name, picture,
    };
  }
  console.debug(dataPayload);
  const serverToken = generateJWTToken(dataPayload);

  return serverToken;
};

module.exports = (User) => ({
  getUsers: getUsers(User),
  getUserOne: getUserOne(User),
  getUserById: getUserById(User),
  createUser: createUser(User),
  editUser: editUser(User),
  deleteUser: deleteUser(User),

  signup: signup(User),
  signin: signin(User),
  googleAuth: googleAuth(User),
});
