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
const checkjwttoken_1 = __importDefault(require("./middleware/checkjwttoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const createTicket_1 = __importDefault(require("./ticket/createTicket"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8888;
dotenv_1.default.config();
app.use(express_1.default.json());
//app.use('/protected/data', checkJwt)
app.get('/', (req, res) => {
    res.send('Hello from TypeScript Express!');
});
app.post('/generateTicket', checkjwttoken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    try {
        const ticketId = yield (0, createTicket_1.default)(userInfo);
        res.send({ ticketId: ticketId });
    }
    catch (error) {
        console.log(error.message);
        res.send(error);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
