import {  PrismaClient } from "@prisma/client";
import { ticketInfo } from "../types/ticketInfo";

const prisma = new PrismaClient();
const createTicket = async(info: ticketInfo) => {
    const existingTickets = await prisma.ticket.count({
        where: {
            vatin: info.vatid
        }
    });
    if (existingTickets >= 3){
        return null
    }

    const newTicket = await prisma.ticket.create({
        data: {
            vatin: info.vatid,
            firstName: info.firstName,
            lastName: info.lastName
        }
    })

    return newTicket.ticketId;
}

export default createTicket;