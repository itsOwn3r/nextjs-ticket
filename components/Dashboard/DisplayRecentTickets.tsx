import Ticket from "@/app/ticket";
import { getTickets } from "./getTickets";

export async function DisplayRecentTickets(){
    const tickets = await getTickets(0);
    let rtArr = tickets.splice(0, 5) // recent tickets array, it only shows first 5 tickets
  
    rtArr = rtArr.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }else{
        return -1
      }
    })
  
    return <>
      {rtArr?.map((ticket:any, i) => {
        return <Ticket key={i} type="recent" id={ticket.id} date={ticket?.ticket[ticket.ticket.length -1].date} title={ticket?.ticket[ticket.ticket.length -1].text}/>
      })}
    </>
  }