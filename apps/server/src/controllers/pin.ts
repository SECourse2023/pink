import { Type } from '@fastify/type-provider-typebox'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { nanoid } from 'nanoid'
import { collections } from '../db/index.js'

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
      const _id = nanoid()
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
      if (!owner) throw server.httpErrors.badRequest()
      const pins = await collections.pins.find({ owner }).toArray()
      return pins
    }
  )

  server.post(
    '/get',
    {
      schema: {
        body: Type.Partial(
          Type.Object({
            _id: Type.String()
          })
        ),
        response: {
          200: Type.Unknown()
        }
      }
    },
    async (req) => {
      const _id = req.body._id
      if (!_id) throw server.httpErrors.badRequest()
      const pin = await collections.pins.findOne({ _id })
      return pin
    }
  )

  server.post(
    '/update',
    {
      schema: {
        body: Type.Object({
          _id: Type.String(),
          set: Type.Partial(
            Type.Object({
              type: Type.String(),
              metadata: Type.Unknown()
            })
          )
        }),
        response: {
          200: Type.Number()
        }
      }
    },
    async (req) => {
      if (!req.body._id) throw server.httpErrors.badRequest()
      const pin = await collections.pins.findOne({ id: req.body._id })
      if (pin.owner != req.user._id) throw server.httpErrors.badRequest()
      const matched_cnt = (
        await collections.pins.updateOne({ _id: req.body._id }, { $set: req.body.set })
      ).matchedCount

      return matched_cnt
    }
  )

  server.post(
    '/delete',
    {
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
      if (!req.body._id) throw server.httpErrors.badRequest()
      const pin = await collections.pins.findOne({ id: req.body._id })
      if (pin.owner != req.user._id) throw server.httpErrors.badRequest()
      const deleted_cnt = (await collections.pins.deleteOne({ _id: req.body._id })).deletedCount

      return deleted_cnt
    }
  )
}
