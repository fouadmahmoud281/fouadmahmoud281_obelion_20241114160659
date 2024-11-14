const { Op } = require('sequelize');
const User = require('../models/User');

async function registerUser(req, res) {
  try {
    const { firstName, familyName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with provided email or phone number already exists' });
    }

    const newUser = await User.create({
      firstName,
      familyName,
      email,
      phoneNumber,
      password,
    });

    return res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred during registration' });
  }
}

async function loginUser(req, res) {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email/phone or password' });
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email/phone or password' });
    }

    return res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred during login' });
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      // Implement password reset token generation and email sending
    }

    return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred during password reset' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
};