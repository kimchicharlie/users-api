import request from 'supertest'

import { comparePasswords } from '../src/helpers/crypto.js'
import app from '../src/app.js'

const TEST_JWT = 'REPLACE_BY_VALID_TOKEN'

const TEST_INVALID_JWT = 'XXXXXX'

describe('/users', () => {
  const testApp = request(app)

  describe('without authentication', () => {
    describe('GET /users', () => {
      test('should respond with a 401 status', async () => {
        return testApp.get('/users').then((response) => {
          expect(response.statusCode).toBe(401)
        })
      })
    })

    describe('GET /users/0', () => {
      test('should respond with a 401 status', async () => {
        return testApp.get('/users/0').then((response) => {
          expect(response.statusCode).toBe(401)
        })
      })
    })

    describe('POST /users', () => {
      test('should respond with a 401 status', async () => {
        return testApp
          .post('/users')
          .send({
            name: 'Alphonse Desjardins',
            username: 'alph_desj',
          })
          .then((response) => {
            expect(response.statusCode).toBe(401)
          })
      })
    })

    describe('PUT /users/0', () => {
      test('should respond with a 401 status', async () => {
        return testApp
          .put('/users/0')
          .send({ name: 'Gabriel-Alphonse Desjardins' })
          .then((response) => {
            expect(response.statusCode).toBe(401)
          })
      })
    })

    describe('DELETE /users/0', () => {
      test('should respond with a 401 status', async () => {
        return testApp.delete('/users/0').then((response) => {
          expect(response.statusCode).toBe(401)
        })
      })
    })
  })

  describe('with authentication, using invalid jwt', () => {
    describe('GET /users', () => {
      test('should respond with a 403 status', async () => {
        return testApp
          .get('/users')
          .set('Authorization', `Bearer ${TEST_INVALID_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(403)
          })
      })
    })

    describe('GET /users/0', () => {
      test('should respond with a 403 status', async () => {
        return testApp
          .get('/users/0')
          .set('Authorization', `Bearer ${TEST_INVALID_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(403)
          })
      })
    })

    describe('POST /users', () => {
      test('should respond with a 403 status', async () => {
        return testApp
          .post('/users')
          .send({
            name: 'Alphonse Desjardins',
            username: 'alph_desj',
          })
          .set('Authorization', `Bearer ${TEST_INVALID_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(403)
          })
      })
    })

    describe('PUT /users/0', () => {
      test('should respond with a 403 status', async () => {
        return testApp
          .put('/users/0')
          .send({ name: 'Gabriel-Alphonse Desjardins' })
          .set('Authorization', `Bearer ${TEST_INVALID_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(403)
          })
      })
    })

    describe('DELETE /users/0', () => {
      test('should respond with a 403 status', async () => {
        return testApp
          .delete('/users/0')
          .set('Authorization', `Bearer ${TEST_INVALID_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(403)
          })
      })
    })
  })

  describe('with authentication, using valid jwt', () => {
    describe('GET /users', () => {
      test('should respond with a 200 status and a list of users', async () => {
        return testApp
          .get('/users')
          .set('Authorization', `Bearer ${TEST_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual([
              {
                id: 0,
                name: 'Alphonse Desjardins',
                username: 'alph_desj',
              },
            ])
          })
      })
    })

    describe('GET /users/0', () => {
      test('should respond with a 200 status and the user', async () => {
        return testApp
          .get('/users/0')
          .set('Authorization', `Bearer ${TEST_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({
              id: 0,
              name: 'Alphonse Desjardins',
              username: 'alph_desj',
            })
          })
      })
    })

    describe('POST /users', () => {
      test('should respond with a 200 status and the created user', async () => {
        return testApp
          .post('/users')
          .send({
            name: 'Alphonse Desjardins',
            username: 'alph_desj',
          })
          .set('Authorization', `Bearer ${TEST_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({
              id: 1,
              name: 'Alphonse Desjardins',
              username: 'alph_desj',
            })
          })
      })
    })

    describe('POST /users with password', () => {
      test('should respond with a 200 status and the created user', async () => {
        const password = 'foobar42!'
        return testApp
          .post('/users')
          .send({
            name: 'Alphonse Desjardins',
            username: 'alph_desj',
            password,
          })
          .set('Authorization', `Bearer ${TEST_JWT}`)
          .then(async (response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(
              expect.objectContaining({
                id: 2,
                name: 'Alphonse Desjardins',
                username: 'alph_desj',
              })
            )
            const isSamePassword = await comparePasswords(
              password,
              response.body.password
            )

            expect(isSamePassword).toBe(true)
          })
      })
    })

    describe('PUT /users/0', () => {
      test('should respond with a 200 status and the updated user', async () => {
        return testApp
          .put('/users/0')
          .send({ name: 'Gabriel-Alphonse Desjardins' })
          .set('Authorization', `Bearer ${TEST_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({
              id: 0,
              name: 'Gabriel-Alphonse Desjardins',
              username: 'alph_desj',
            })
          })
      })
    })

    describe('DELETE /users/0', () => {
      test('should respond with a 200 status', async () => {
        return testApp
          .delete('/users/0')
          .set('Authorization', `Bearer ${TEST_JWT}`)
          .then((response) => {
            expect(response.statusCode).toBe(200)
          })
      })
    })
  })
})
