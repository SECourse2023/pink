import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { collections } from '../db/index.js'
import { nanoid } from 'nanoid'

export const linkController: FastifyPluginAsyncTypebox = async (server) => {
  server.post(
    '/create',
    {
      schema: {
        body: Type.Object({
          from: Type.String(),
          to: Type.String(),
          type: Type.String(),
          metadata: Type.Unknown()
        }),
        response: {
          200: Type.Object({
            _id: Type.String()
          })
        }
      }
    },
    async (req) => {
      const _id = nanoid()
      // TODO: permission control
      const { from, to, type, metadata } = req.body
      await collections.links.insertOne({
        _id,
        from,
        to,
        type,
        metadata
      })
      return { _id }
    }
  )

  server.get(
    '/list',
    {
      schema: {
        querystring: Type.Partial(
          Type.Object({
            from: Type.String(),
            to: Type.String()
          })
        ),
        response: {
          200: Type.Array(Type.Unknown())
        }
      }
    },
    async (req) => {
      const { from, to } = req.query
      if (!from && !to) throw server.httpErrors.badRequest()
      const links = await collections.links.find({ from, to }).toArray()
      return links
    }
  )

  server.get(
    '/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String()
        }),
        response: {
          200: Type.Unknown()
        }
      }
    },
    async (req) => {
      const link = await collections.links.findOne({ _id: req.params.id })
      return link
    }
  )

  server.put(
    '/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String()
        }),
        body: Type.Partial(
          Type.Object(
            {
              from: Type.String(),
              to: Type.String(),
              type: Type.String(),
              metadata: Type.Unknown()
            },
            { additionalProperties: false }
          )
        ),
        response: {
          200: Type.Number()
        }
      }
    },
    async (req) => {
      // TODO: permission control
      await collections.links.updateOne({ _id: req.params.id }, { $set: req.body })
      return 0
    }
  )

  server.delete(
    '/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String()
        }),
        response: {
          200: Type.Number()
        }
      }
    },
    async (req) => {
      // TODO: permission control
      const resp = await collections.links.deleteOne({ _id: req.params.id })
      return resp.deletedCount
    }
  )
}
