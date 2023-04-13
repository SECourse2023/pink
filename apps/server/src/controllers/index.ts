import fastifyJwt from '@fastify/jwt'
import fastifySensible from '@fastify/sensible'
import { linkController } from './link.js'
import { pinController } from './pin.js'
import { queryController } from './query.js'
import { userController } from './user.js'
import { JWT_SECRET } from '../config/index.js'
import { logger } from '../utils/logger.js'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

declare module 'fastify' {
  interface FastifyContextConfig {
    bypassAuth?: boolean
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { _id: string }
    user: { _id: string }
  }
}

export const apiPlugin: FastifyPluginAsyncTypebox = async (server) => {
  await server.register(fastifyJwt, {
    secret: JWT_SECRET
  })
  await server.register(fastifySensible)
  server.addHook('preParsing', async (req) => {
    if (req.routeConfig.bypassAuth) return
    const header = req.headers.authorization
    if (typeof header !== 'string') {
      throw server.httpErrors.unauthorized()
    }
    try {
      await req.jwtVerify()
    } catch (err) {
      logger.info(err)
      throw server.httpErrors.unauthorized()
    }
  })
  await server.register(userController, { prefix: '/user' })
  await server.register(pinController, { prefix: '/pin' })
  await server.register(linkController, { prefix: '/link' })
  await server.register(queryController, { prefix: '/query' })
}
