import redisService from '../src/services/redis.service'

describe('Redis Client', () => {
  beforeAll(async () => {
    await redisService.connect()
  })

  afterAll(async () => {
    await redisService.disconnect()
  })

  it('should set and get a value', async () => {
    await redisService.set('testKey', 'testValue')
    const value = await redisService.get('testKey')
    expect(value).toBe('testValue')
  })

  it('should pass health check', async () => {
    const isHealthy = await redisService.checkHealth()
    expect(isHealthy).toBe(true)
  })
})
