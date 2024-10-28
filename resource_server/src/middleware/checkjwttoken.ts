// // src/middleware/checkJwt.ts

// import {expressjwt} from 'express-jwt';
// import jwksRsa from 'jwks-rsa';
// import dotenv from 'dotenv';

// dotenv.config();

// // Middleware to check JWT from Auth0
// const checkJwt = expressjwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//   }),
//   audience: process.env.AUTH0_AUDIENCE, // The audience you set in your Auth0 API
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256'],
// });

// export default checkJwt;

// src/middleware/checkJwt.ts

import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to check JWT from Auth0
const checkJwt = 
  expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as any, // Type assertion to satisfy TypeScript
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});


export default checkJwt;
