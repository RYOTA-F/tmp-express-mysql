const request = require('supertest')
// import request from 'supertest'
import app from '../../index'
// const app = require('../../index')

/**
 * GET Users
 */
describe('GET /users', () => {
  it('取得成功', () => {
    return request(app).get('/users').expect(200)
  })
})

/**
 * POST User
 */
describe('POST /users', () => {
  it('「name」が存在しません', () => {
    return request(app)
      .post('/users')
      .send('age=29')
      .expect(400)
      .expect({
        error: {
          status: 400,
          type: 'PARAMETER_INVALID',
          message: 'The parameter is invalid.',
        },
      })
  })
})
