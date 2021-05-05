// import { should } from 'chai'
// import request from 'supertest'
import httpMocks from 'node-mocks-http'
import { login } from '../../src/routes/api'
import assert from 'assert'

describe('Login to system', () => {
  const mockRequest = httpMocks.createRequest({
    method: 'POST',
    url: '/api/login',
    body: {
      'username': 'tautvis62',
      'password': 'testavimas'
    }
  })
  const mockResponse = httpMocks.createResponse()
  login(mockRequest, mockResponse)

  const actualStatus = mockResponse.statusCode
  const expectedStatus = 200
  assert.strictEqual(actualStatus, expectedStatus)

})