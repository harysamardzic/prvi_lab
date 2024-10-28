import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import retrieveToken from './auth/m2mAuth';
import axios, { AxiosError } from 'axios';
import QRCode from 'qrcode';
import createTicket from './qr_generation/generateTicket';
import { ticketInfo } from './types/ticketInfo';
import { auth } from 'express-openid-connect';
import cors, { CorsOptions } from 'cors'

dotenv.config();

const corsOptions: CorsOptions = {
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


const app = express();
app.use(cors(corsOptions))

const PORT = process.env.PORT || 5500;
app.use(express.json())
app.use(auth(config));


app.post('/create', async (req:Request, res: Response) => {
    try {
      
      const ticketInfo: ticketInfo = req.body
      
      if (!ticketInfo.vatid || !ticketInfo.firstName || !ticketInfo.lastName) {
        throw new Error("User data not defined correctly")
      }

      const token = await retrieveToken();
      
      const ticketData = await createTicket(token, ticketInfo) // treba vratiti ticketId      
      if (ticketData.ticketId === null){
         // TODO
        res.send("This OIB already has three tickets.\nPlease input a different OIB")
      }else{
      
      const urlToEncode = `${process.env.FE_URL}/ticket/${ticketData.ticketId}`
      const qrCode = await QRCode.toDataURL(urlToEncode)      
      res.send({qrCode: qrCode, ticketId: ticketData.ticketId})}
    } catch (error: any | AxiosError) {
      if(axios.isAxiosError(error)){
        res.send(error.message)
      }else{
      res.send(error)}
    
    }
    
    
})

app.get('/protected', async (req: Request, res: Response) => {
  const token = await retrieveToken();

  
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});