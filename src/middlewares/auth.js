import { auth } from 'express-oauth2-jwt-bearer'

// middleware verifying that the request contains a valid JWT in the headers
export const jwtCheck = auth({
  // unique identifier for the API
  audience: process.env.JWT_AUDIENCE,
  // entity that issued the JWT
  issuerBaseURL: process.env.JWT_ISSUER,
  // algorithm used for token encryption
  tokenSigningAlg: 'RS256',
})
