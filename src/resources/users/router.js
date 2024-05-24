import express from 'express'
import { UserService } from './services.js'

const router = express.Router()

// GET / : returns all users
router.get('/', async (_, res) => {
  const usersService = new UserService()
  const users = await usersService.findAll()
  res.status(200).send(users)
})

// GET /:userId : returns the user identified by the "userId" parameter
router.get('/:userId', async (req, res) => {
  const usersService = new UserService()
  const parsedUserId = Number(req.params.userId)
  try {
    const user = await usersService.findById(parsedUserId)
    res.status(200).send(user)
  } catch (error) {
    res.status(error.code || 500).send({
      error: error.message,
    })
  }
})

// POST / : creates a user using the request's body
router.post('/', async (req, res) => {
  const usersService = new UserService()
  const createdUser = await usersService.create(req.body)
  res.status(200).send(createdUser)
})

// PUT /:userId : retrieves the user identified by the "userId" parameter and updates the fields from the request's body
router.put('/:userId', async (req, res) => {
  const usersService = new UserService()
  const parsedUserId = Number(req.params.userId)
  try {
    const updatedUser = await usersService.update(parsedUserId, req.body)
    res.status(200).send(updatedUser)
  } catch (error) {
    res.status(error.code || 500).send({
      error: error.message,
    })
  }
})

// DELETE /:userId : deletes the user identified by the "userId" parameter
router.delete('/:userId', async (req, res) => {
  const usersService = new UserService()
  const parsedUserId = Number(req.params.userId)
  try {
    await usersService.delete(parsedUserId)
    res.status(200).send('ok')
  } catch (error) {
    res.status(error.code || 500).send({
      error: error.message,
    })
  }
})

export default router
