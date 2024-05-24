import { encryptPassword } from '../../helpers/crypto.js'

let users = [
  {
    id: 0,
    name: 'Alphonse Desjardins',
    username: 'alph_desj',
  },
]

// UserService class containing all methods to interact with users in "database"
export class UserService {
  constructor() {}

  // throw a not found error + status code 404
  throwNotFound(userId) {
    const error = new Error(`User with id ${userId} not found`)
    error.code = 404
    throw error
  }

  // returns all users
  findAll = async () => users

  // returns a user using its id
  findById = async (userId) => {
    const userFound = users.find((user) => user.id === userId)
    if (!userFound) {
      this.throwNotFound(userId)
    }
    return userFound
  }

  // adds a user in "database"
  create = async (payload) => {
    const lastUser = users[users.length - 1]
    // default id should be 0, otherwise "max id + 1"
    const nextId = lastUser ? lastUser.id + 1 : 0
    const newUser = {
      id: nextId,
      ...payload,
      // if a password is defined, encrypted it, otherwise, no password is used
      ...(payload.password && {
        password: await encryptPassword(payload.password),
      }),
    }
    // add the user in "database"
    users.push(newUser)

    return newUser
  }

  // update the user identified by userId in "database"
  // only the payload fields are updated, the other ones remain the same
  update = async (userId, payload) => {
    let updatedUserIndex = null

    users = users.map((user, index) => {
      if (user.id === userId) {
        updatedUserIndex = index
        const updatedUser = {
          ...user,
          ...payload,
          id: userId,
        }
        return updatedUser
      }
      return user
    })

    if (updatedUserIndex === null) {
      this.throwNotFound(userId)
    }

    return users[updatedUserIndex]
  }

  // deleting a user using its id
  delete = async (userId) => {
    let deletedUserIndex = null

    // rewriting the users array by filtering the original one
    users = users.filter((user, index) => {
      if (user.id === userId) {
        deletedUserIndex = index
        return false
      }
      return true
    })

    if (deletedUserIndex === null) {
      this.throwNotFound(userId)
    }
  }
}
