"use strict";
// src/auth/auth0Client.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var access_token = null;
const getAuthToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const m2mDomain = process.env.M2M_URL;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const audience = process.env.AUDIENCE;
    const response = yield axios_1.default.post(`${m2mDomain}`, {
        client_id: clientId,
        client_secret: clientSecret,
        audience: audience,
        grant_type: 'client_credentials',
    }, {
        headers: {
            'Content-Type': 'application/json', // Set Content-Type to application/json
        }
    });
    return response.data.access_token;
});
const retrieveToken = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!access_token) {
        access_token = yield getAuthToken();
    }
    return access_token;
});
exports.default = retrieveToken;
