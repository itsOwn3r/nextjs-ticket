import Ticket from "@/app/ticket";
import { getTickets } from "./getTickets";
import Link from "next/link";

type TicketType = {
    user: string,
    name: string,
    avatar?: string,
    images?: string[],
    text: string,
    date: number
}

export async function DisplayTickets(pagination: { page: string | number }){
    const page = Number(pagination.page) - 1;
    const tickets = await getTickets(page);
  
    return (
      <>
        {tickets?.map((ticket, i) => {
          const lastTicket:TicketType = JSON.parse(JSON.stringify(ticket.ticket[ticket.ticket.length - 1]));
          return <Ticket key={i} type="tickets" lastResponder={lastTicket.name || "User"} id={ticket.id} title={ticket.title} ticketStatus={ticket.status} department={ticket.department} date={ticket.date} priority={ticket.priority} tag={ticket.tag} length={ticket.ticket.length} />
        })}
  
        {tickets.length < 1 && <div className="flex justify-center w-[100%] mt-[20px] text-center flex-col">
          <span className="text-[20px]">Seems like there is no ticket here!</span>
          <Link href="/new" className="w-[100%]"><button className="w-[70%] lg:w-[30%] mt-[15px] bg-[#3342c5] text-[18px] rounded-[10px] p-[10px] cursor-pointer hover:bg-[#5665ee]">Create Your New Ticket</button></Link>
        </div>
        }
      </>
    )
  }