import { Type } from '@sinclair/typebox'

export const metadataSchema = Type.Record(
  Type.String({
    pattern: '^[a-zA-Z0-9:_-]+$',
    minLength: 1,
    maxLength: 256
  }),
  Type.Unknown()
)

export const userSchema = Type.Object({
  _id: Type.String(),
  username: Type.String(),
  email: Type.String()
})

export const pinSchema = Type.Object({
  _id: Type.String(),
  type: Type.String(),
  owner: Type.String(),
  metadata: metadataSchema
})

export const linkSchema = Type.Object({
  _id: Type.String(),
  from: Type.String(),
  to: Type.String(),
  type: Type.String(),
  metadata: metadataSchema
})
