import React from "react";
import Aside from "./Aside";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Content from "./Content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";
import Link from "next/link";
type Ticket = {
  id: string,
  title: string,
  ticket: {
    user: string,
    name: string,
    avatar: string | null,
    images: string[],
    text: string,
    date: number
  }[],
  userMail: string,
  department: string,
  priority: string,
  status: string,
  tag: string[],
  userName: string,
  images: string[],
  responder: { name: string; email: string; phone: string; lang: string; avatar: string | null; }[],
  date: number,
  time: Date
}
const Home = async ({ticket, documentTitle}: {ticket: Ticket, documentTitle: string | undefined }) => {
  return (
    <>
      <Aside />
      <div className="full-width">
        <div className="wrapper h-full">
          <Header />
          <SubHeader status={ticket?.status || "Open"} TicketNumber={ticket?.id} text={<Link href="/dashboard">Other Tickets?</Link>} />
          <Content ticket={ticket} type="ticket" documentTitle={documentTitle} />
        </div>
      </div>
    </>
  );
};

export default Home;
