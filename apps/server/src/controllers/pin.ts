import { Type } from '@fastify/type-provider-typebox'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { collections } from '../db/index.js'
import { registerDOID } from '../gateway/index.js'

export const pinController: FastifyPluginAsyncTypebox = async (server) => {
  //
  // DO: id, doid, type, metadata, owner
  // metadata: {des:'', }
  // type: String

  server.post(
    '/create',
    {
      schema: {
        body: Type.Partial(
          Type.Object({
            type: Type.String(),
            metadata: Type.Unknown()
          })
        ),
        response: {
          200: Type.String()
        }
      }
    },
    async (req) => {
      const _id = await registerDOID({
        type: req.body.type,
        metadata: JSON.stringify(req.body.metadata)
      })
      await collections.pins.insertOne({
        _id,
        type: req.body.type,
        owner: req.user._id,
        metadata: req.body.metadata
      })
      return _id
    }
  )

  server.get(
    '/list',
    {
      schema: {
        response: {
          200: Type.Array(Type.Unknown())
        }
      }
    },
    async (req) => {
      const owner = req.user._id
      const pins = await collections.pins.find({ owner }).toArray()
      return pins
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
      const _id = req.params.id
      if (!_id) throw server.httpErrors.notFound()
      const pin = await collections.pins.findOne({ _id })
      return pin
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
      const _id = req.params.id
      const pin = await collections.pins.findOne({ _id })
      if (pin.owner != req.user._id) throw server.httpErrors.forbidden()
      await collections.pins.updateOne({ _id }, { $set: req.body })
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
      const _id = req.params.id
      const pin = await collections.pins.findOne({ _id })
      if (pin.owner != req.user._id) throw server.httpErrors.forbidden()
      await collections.pins.deleteOne({ _id })
      return 0
    }
  )
}
