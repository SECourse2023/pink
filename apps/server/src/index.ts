import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { logger } from './utils/logger.js'
import { apiPlugin } from './controllers/index.js'

const server = fastify({
  logger
})
await server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Pink',
      description: 'Pink',
      version: 'latest'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  }
})
await server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})
await server.register(apiPlugin, { prefix: '/api' })
await server.listen({
  port: 8848
})
