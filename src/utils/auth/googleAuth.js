const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '1006614023488-fsesbrk6230mdteo3bmik584ugsn04ad.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
// const verifyGoogleToken = async (req, res, next) => {

// }
async function googleVerify(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // const userid = payload.sub;
    return payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  googleVerify,
};
