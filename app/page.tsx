import React, { Suspense } from "react";
import Aside from "./components/Home/Aside";
import { Metadata } from "next";
import Header from "./components/Home/Header";
import SubHeader from "./components/Home/SubHeader";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import Ticket from "./ticket";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { FaSpinner } from "react-icons/fa";


export async function getTickets() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
   let tickets;
   if (session?.user?.type === "admin") {
      tickets = await prisma.ticket.findMany()
   }else{
    tickets = await prisma.ticket.findMany({
    where: {
      userMail: email
    }
  })}

  tickets = tickets.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }else{
      return -1
    }
  })
  return tickets;
}

export async function DisplayTickets(){
  const tickets = await getTickets()

  return <>{tickets?.map((ticket, i) => {
    return <Ticket key={i} type="tickets" id={ticket.id} title={ticket.title} ticketStatus={ticket.status} department={ticket.department} date={ticket.date} priority={ticket.priority} tag={ticket.tag} length={ticket.ticket.length} />
   })}
    {tickets.length < 1 && <div className="flex justify-center w-[100%] mt-[20px] text-center flex-col">
    <span className="text-[20px]">Seems like you don&apos;t have any ticket yet!</span>
    <Link href="/new" className="w-[100%]"><button className="w-[30%] mt-[15px] bg-[#3342c5] text-[18px] rounded-[10px] p-[10px] cursor-pointer hover:bg-[#5665ee]">Create Your First Ticket</button></Link>
    </div> }
   </>
}

export async function DisplayRecentTickets(){
  const tickets = await getTickets()
  const recentTickets: {id: string, text: string, date: number}[] = []

  for(let ticket of tickets){
    recentTickets.push({id: ticket.id,text: ticket.ticket[ticket.ticket.length - 1]!.text, date: ticket.ticket[ticket.ticket.length - 1]!.date})
  }

  let rtArr = recentTickets.splice(0, 5) // recent tickets array, it only shows first 5 tickets

  rtArr = rtArr.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }else{
      return -1
    }
  })

  return <>
    {rtArr?.map((ticket, i) => {
      return <Ticket key={i} type="recent" id={ticket.id} date={ticket.date} title={ticket.text} />
    })}
  </>
}
const Dashboard = async () => {

  return (
    <>
      <Aside />
      <div className="full-width">
        <div className="wrapper h-full">
            <Header />
            <SubHeader status="Dashboard" text={<Link className="underline text-[orange]" href="/new">New Ticket?</Link>}  />
            <div className="flex justify-center">
            <div className="container flex justify-between mt-[10px] flex-col md:flex-row">
                <div className="tickets w-full flex justify-start flex-col">
                  <div className="w-full h-min flex justify-center">
                      <h3>Your Tickets</h3>
                  </div>
                <div className="flex justify-between w-full max-w-[768px] flex-wrap flex-col md:flex-row">
                  
                  <Suspense fallback={<div className="flex justify-center w-full mt-[4rem]"><FaSpinner className="animate-spin text-[4rem]" /></div>}>
                  <DisplayTickets />
                  </Suspense>

                </div>
                </div>
                <div className="alltickets statistics w-full flex flex-col justify-start items-center mt-[20px] md:mt-[unset]">
                      <h3>Recent Messages</h3>

                  <Suspense fallback={<div className="flex justify-center w-full mt-[4rem]"><FaSpinner className="animate-spin text-[4rem]" /></div>}>
                  <DisplayRecentTickets />
                  </Suspense>

                </div>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export const metadata: Metadata = {
  title: "Dashboard - Ticketing System",
  description: "Dashboard of Ticketing System",
};