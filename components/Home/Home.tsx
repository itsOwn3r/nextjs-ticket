import React from "react";
import Aside from "./Aside";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Content from "./Content";
import Link from "next/link";
import { Ticket } from "@prisma/client";

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
