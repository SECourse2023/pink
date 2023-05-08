import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { collections } from '../db/index.js'
import { registerDOID } from '../gateway/index.js'
import { linkSchema, metadataSchema } from '../schemas/index.js'

export const linkController: FastifyPluginAsyncTypebox = async (server) => {
  server.post(
    '/create',
    {
      schema: {
        body: Type.Object({
          from: Type.String(),
          to: Type.String(),
          type: Type.String(),
          metadata: metadataSchema
        }),
        response: {
          200: Type.Object({
            _id: Type.String()
          })
        }
      }
    },
    async (req) => {
      const { from, to, type, metadata } = req.body
      const fromPin = await collections.pins.findOne({
        _id: from
      })
      if (!fromPin) throw server.httpErrors.badRequest()
      if (fromPin.owner !== req.user._id) throw server.httpErrors.forbidden()
      const _id = await registerDOID({
        role: 'link',
        type,
        from,
        to,
        metadata: Buffer.from(JSON.stringify(metadata)).toString('base64url')
      })
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
          200: Type.Array(linkSchema)
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
          200: linkSchema
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
        body: Type.Object({
          metadata: metadataSchema
        }),
        response: {
          200: Type.Number()
        }
      }
    },
    async (req) => {
      const link = await collections.links.findOne({ _id: req.params.id })
      if (!link) throw server.httpErrors.notFound()
      const fromPin = await collections.pins.findOne({ _id: link.from })
      if (!fromPin) throw server.httpErrors.internalServerError()
      if (fromPin.owner !== req.user._id) throw server.httpErrors.forbidden()
      await collections.links.updateOne(
        { _id: req.params.id },
        {
          $set: {
            metadata: req.body.metadata
          }
        }
      )
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
      const link = await collections.links.findOne({ _id: req.params.id })
      if (!link) throw server.httpErrors.notFound()
      const fromPin = await collections.pins.findOne({ _id: link.from })
      if (!fromPin) throw server.httpErrors.internalServerError()
      if (fromPin.owner !== req.user._id) throw server.httpErrors.forbidden()
      const resp = await collections.links.deleteOne({ _id: req.params.id })
      return resp.deletedCount
    }
  )
}
