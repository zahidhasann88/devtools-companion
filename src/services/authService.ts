import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import config from '../config/default';

export const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');
  const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};
