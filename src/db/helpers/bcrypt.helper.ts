import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export async function encryptPassword(password) {
  return await hash(password, SALT_ROUNDS);
}

export async function getRandomKeyForUser(user: User) {
  return await hash(`${user.id}_${user.userName}`, SALT_ROUNDS);
}

export async function verifyKeyForUser(key: string, user: User) {
  return await compare(key, `${user.id}_${user.userName}`);
}
