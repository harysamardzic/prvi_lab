import express, { Request, RequestHandler, Response } from 'express';
import checkJwt from './middleware/checkjwttoken';
import dotenv from 'dotenv';
import createTicket from './ticket/createTicket';
import { ticketInfo } from './types/ticketInfo';

const app = express();
const PORT = process.env.PORT || 8888;
dotenv.config();
app.use(express.json())

//app.use('/protected/data', checkJwt)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.post('/generateTicket',checkJwt as unknown as RequestHandler, async (req: Request, res:Response) => {
  const userInfo: ticketInfo = req.body
  try{
    const ticketId = await createTicket(userInfo);
    res.send({ticketId: ticketId})
  }catch(error: any){
    console.log(error.message);
    
    res.send(error);
  }  
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
