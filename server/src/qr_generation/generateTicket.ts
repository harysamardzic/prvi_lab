import axios, { AxiosError } from "axios"
import dotenv from 'dotenv'
import { UserInfo } from "os";
import { ticketInfo } from "../types/ticketInfo";

dotenv.config();

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


const getCodeData = async (token: string, info: ticketInfo) => {
  try {
    const response = await axios.post(`${process.env.RESOURCE_SERVER_URL}/generateTicket`,
      {
      vatid: info.vatid, // Example data
      firstName: info.firstName,
      lastName: info.lastName
      },{
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    return response.data; // Return the response data directly
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e);
      throw new Error(e.message); // Throw a regular Error
    } else {
      console.error("An unexpected error occurred:", e);
      throw new Error("An unexpected error occurred.");
    }
  }
};


export default getCodeData;