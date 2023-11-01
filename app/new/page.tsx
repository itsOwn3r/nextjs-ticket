import React from "react";
import Aside from "../components/Home/Aside";
import Header from "../components/Home/Header";
import SubHeader from "../components/Home/SubHeader";
import Content from "../components/Home/Content";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Open New Ticket',
  description: 'Open New Ticket',
}
const Home = async () => {
  return (
    <>
      <Aside />
      <div className="full-width">
        <div className="wrapper h-full">
          <Header />
          <SubHeader status="Opening New Ticket" TicketNumber={undefined} text={undefined} />
         <Content type="newticket"/>

        </div>
      </div>
    </>
  );
};

export default Home;
