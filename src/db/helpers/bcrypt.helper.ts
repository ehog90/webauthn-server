import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export async function encryptPassword(password) {
  return await hash(password, SALT_ROUNDS);
}
