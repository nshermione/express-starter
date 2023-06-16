import bcryptjs from 'bcryptjs';

export const Crypto = {
  async hashPassword(password) {
    return await bcryptjs.hash(password, 8);
  },
  async comparePassword(password, hasedPassword) {
    return await bcryptjs.compare(password, hasedPassword);
  }
}