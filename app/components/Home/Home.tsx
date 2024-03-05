import React from "react";
import Aside from "./Aside";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Content from "./Content";
import Link from "next/link";
type Ticket = {
  id: string,
  title: string,
  ticket: {
    user: string,
    name: string,
    avatar: string | undefined,
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
  responder: { name: string; email: string; phone: string; lang: string; avatar: string | undefined; }[],
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
          <SubHeader status={ticket?.status || "Open"} TicketNumber={ticket?.id} text={<Link href="/">Other Tickets?</Link>} />
          <Content ticket={ticket} type="ticket" documentTitle={documentTitle} />
        </div>
      </div>
    </>
  );
};

export default Home;
