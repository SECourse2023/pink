import { Type } from '@fastify/type-provider-typebox'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { collections } from '../db/index.js'

export const userController: FastifyPluginAsyncTypebox = async (server) => {
  server.post(
    '/register',
    {
      schema: {
        body: Type.Object({
          username: Type.String(),
          email: Type.String({ format: 'email' }),
          password: Type.String()
        }),
        response: {
          200: Type.Object({
            _id: Type.String()
          })
        }
      },
      config: {
        bypassAuth: true
      }
    },
    async (req) => {
      const _id = nanoid()
      const hash = await bcrypt.hash(req.body.password, 10)
      await collections.users.insertOne({
        _id,
        username: req.body.username,
        email: req.body.email,
        hash
      })
      return { _id }
    }
  )

  server.post(
    '/login',
    {
      schema: {
        body: Type.Object({
          username: Type.String(),
          password: Type.String()
        }),
        response: {
          200: Type.Object({
            token: Type.String()
          })
        }
      },
      config: {
        bypassAuth: true
      }
    },
    async (req) => {
      const user = await collections.users.findOne({
        username: req.body.username
      })
      if (!user) {
        throw server.httpErrors.unauthorized()
      }
      const match = await bcrypt.compare(req.body.password, user.hash)
      if (!match) {
        throw server.httpErrors.unauthorized()
      }
      return {
        token: server.jwt.sign({ _id: user._id })
      }
    }
  )

  server.post(
    '/authorize',
    {
      schema: {
        body: Type.Object({
          response_type: Type.String(),
          client_id: Type.String(),
          redirect_uri: Type.String(),
          scope: Type.String(),
          state: Type.String(),
          nonce: Type.String()
        })
      }
    },
    async (req) => {
      const user = await collections.users.findOne({ _id: req.user._id })
      const idToken = server.jwt.sign(user)
      const accessToken = server.jwt.sign({ _id: user._id })
      return { idToken, accessToken }
    }
  )

  server.get('/profile', async (req) => {
    const user = await collections.users.findOne({ _id: req.user._id })
    return {
      _id: user._id,
      username: user.username,
      email: user.email
    }
  })
}
