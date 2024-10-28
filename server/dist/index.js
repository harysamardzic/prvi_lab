"use strict";
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const m2mAuth_1 = __importDefault(require("./auth/m2mAuth"));
const axios_1 = __importDefault(require("axios"));
const qrcode_1 = __importDefault(require("qrcode"));
const generateTicket_1 = __importDefault(require("./qr_generation/generateTicket"));
const express_openid_connect_1 = require("express-openid-connect");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const corsOptions = {
    origin: process.env.FE_URL, // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
    credentials: true, // Enable cookies/sessions if needed
};
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:5500/',
    clientID: 'PAriu6Zjh5bb9kWX8aDY8K0mRAwzf94w',
    issuerBaseURL: 'https://dev-e5iaasvkh00apbe7.eu.auth0.com'
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const PORT = process.env.PORT || 5500;
app.use(express_1.default.json());
app.use((0, express_openid_connect_1.auth)(config));
app.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketInfo = req.body;
        if (!ticketInfo.vatid || !ticketInfo.firstName || !ticketInfo.lastName) {
            throw new Error("User data not defined correctly");
        }
        const token = yield (0, m2mAuth_1.default)();
        const ticketData = yield (0, generateTicket_1.default)(token, ticketInfo); // treba vratiti ticketId      
        if (ticketData.ticketId === null) {
            // TODO
            res.send("This OIB already has three tickets.\nPlease input a different OIB");
        }
        else {
            const urlToEncode = `${process.env.FE_URL}/ticket/${ticketData.ticketId}`;
            const qrCode = yield qrcode_1.default.toDataURL(urlToEncode);
            res.send({ qrCode: qrCode, ticketId: ticketData.ticketId });
        }
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            res.send(error.message);
        }
        else {
            res.send(error);
        }
    }
}));
app.get('/protected', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, m2mAuth_1.default)();
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
