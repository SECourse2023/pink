import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { collections } from '../db/index.js'

export const queryController: FastifyPluginAsyncTypebox = async (server) => {
  server.get(
    '/stats',
    {
      config: {
        bypassAuth: true
      }
    },
    async () => {
      return {
        pins: await collections.pins.estimatedDocumentCount(),
        links: await collections.links.estimatedDocumentCount(),
        users: await collections.users.estimatedDocumentCount()
      }
    }
  )

  server.post(
    '/getLinkOf',
    {
      config: {
        bypassAuth: true
      },
      schema: {
        body: Type.Partial(
          Type.Object({
            from: Type.String(),
            to: Type.String()
          })
        )
      }
    },
    async (req) => {
      const { from, to } = req.body
      if (!from && !to) throw server.httpErrors.badRequest()
      const links = await collections.links.find(req.body).toArray()
      return links
    }
  )

  server.post(
    '/getAllLinks',
    {
      config: {
        bypassAuth: true
      }
    },
    async () => {
      const links = await collections.links.find().toArray()
      return links
    }
  )

  server.post(
    '/getAllPins',
    {
      config: {
        bypassAuth: true
      }
    },
    async () => {
      const pins = await collections.pins.find().toArray()
      return pins
    }
  )
}
