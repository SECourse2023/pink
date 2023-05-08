import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyStatic from '@fastify/static'
import { logger } from './utils/logger.js'
import { apiPlugin } from './controllers/index.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = fastify({
  logger
})
await server.register(fastifyStatic, {
  root: join(__dirname, '..', 'public'),
  extensions: ['html']
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
  port: 8848,
  host: '0.0.0.0'
})
