import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { collections } from '../db/index.js'
import { nanoid } from 'nanoid'
import { assert } from 'console'

export const linkController: FastifyPluginAsyncTypebox = async (server) => {
  server.post(
    '/create',
    {
      config: {
        bypassAuth: true
      },
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

  server.post(
    '/list',
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
        ),
        response: {
          200: Type.Array(Type.Unknown())
        }
      }
    },
    async (req) => {
      const { from, to } = req.body
      if (!from && !to) throw server.httpErrors.badRequest()
      const links = await collections.links.find({ from, to }).toArray()
      return links
    }
  )

  server.post(
    '/get',
    {
      config: {
        bypassAuth: true
      },
      schema: {
        body: Type.Object({
          _id: Type.String()
        }),
        response: {
          200: Type.Unknown()
        }
      }
    },
    async (req) => {
      const link = await collections.links.findOne({ _id: req.body._id })
      return link
    }
  )

  server.post(
    '/update',
    {
      config: {
        bypassAuth: true
      },
      schema: {
        body: Type.Object({
          _id: Type.String(),
          set: Type.Partial(
            Type.Object({
              from: Type.String(),
              to: Type.String(),
              type: Type.String(),
              metadata: Type.Unknown()
            }),
            { additionalProperties: false }
          )
        }),
        response: {
          200: Type.Number()
        }
      }
    },
    async (req) => {
      const resp = await collections.links.updateOne(
        { _id: req.body._id },
        {
          $set: req.body.set
        }
      )
      return resp.modifiedCount
    }
  )

  server.post(
    '/delete',
    {
      config: {
        bypassAuth: true
      },
      schema: {
        body: Type.Object({
          _id: Type.String()
        }),
        response: {
          200: Type.Number()
        }
      }
    },
    async (req) => {
      const resp = await collections.links.deleteOne({ _id: req.body._id })
      return resp.deletedCount
    }
  )
}
