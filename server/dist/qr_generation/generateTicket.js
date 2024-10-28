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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* const getCodeData = async(token: string) => {
    await axios.get(`${process.env.RESOURCE_SERVER_URL}/generateTicket`,{
        headers: {
          Authorization:`Bearer ${token}`
        },
      }).then((response) => {
        return response.data;
      }).catch((e: AxiosError) => {
        console.log(e);
        throw new AxiosError(e.message)
      });
} */
const getCodeData = (token, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${process.env.RESOURCE_SERVER_URL}/generateTicket`, {
            vatid: info.vatid, // Example data
            firstName: info.firstName,
            lastName: info.lastName
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the response data directly
    }
    catch (e) {
        if (axios_1.default.isAxiosError(e)) {
            console.log(e);
            throw new Error(e.message); // Throw a regular Error
        }
        else {
            console.error("An unexpected error occurred:", e);
            throw new Error("An unexpected error occurred.");
        }
    }
});
exports.default = getCodeData;
