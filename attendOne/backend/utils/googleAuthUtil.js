const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

exports.getGoogleAuthURL = () => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['profile', 'email'],
  });
  return url;
};

exports.authenticateGoogleUser = async (code) => {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const { sub: googleId, email, given_name: firstName, family_name: familyName } = payload;

  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({
      firstName,
      familyName,
      email,
      googleId,
      password: null,
      phoneNumber: null,
    });
  }

  const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

  return { user, token };
};