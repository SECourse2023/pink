function env(key: string, defaultValue: string): string {
  const value = process.env[key]
  if (value === undefined) {
    return defaultValue
  }
  return value
}

export const MONGO_URI = env('MONGO_URI', 'mongodb://db:27017/pink')
export const JWT_SECRET = env('JWT_SECRET', 'topSECRET')
export const GATEWAY_URL = env('GATEWAY_URL', 'http://gateway:8000')
