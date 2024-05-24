import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

// straightforward use of bcrypt to encrypt a password
export const encryptPassword = (password) => bcrypt.hash(password, SALT_ROUNDS)

// straightforward use of bcrypt to compare a password with a hash
export const comparePasswords = (password, hash) =>
  bcrypt.compare(password, hash)
