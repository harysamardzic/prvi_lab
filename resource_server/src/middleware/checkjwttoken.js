"use strict";
// // src/middleware/checkJwt.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware to check JWT from Auth0
const checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }), // Type assertion to satisfy TypeScript
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
});
exports.default = checkJwt;
