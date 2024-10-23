import React, { Suspense } from "react";
import Aside from "@/components/Home/Aside";
import { Metadata } from "next";
import Header from "@/components/Home/Header";
import SubHeader from "@/components/Home/SubHeader";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import Pagination from "@/components/pagination";
import { getTicketsLength } from "@/components/Dashboard/getTicketsLength";
import { DisplayTickets } from "@/components/Dashboard/DisplayTickets";
import { DisplayRecentTickets } from "@/components/Dashboard/DisplayRecentTickets";

export const metadata: Metadata = {
  title: "Dashboard - Ticketing System",
  description: "Dashboard of Ticketing System",
};

const Dashboard = async (params: { searchParams: { page: string | number }}) => {

  const currentPage = Number(params.searchParams.page) || 1;
  const ticketsLength = await getTicketsLength();
  const pages = Math.ceil(ticketsLength / 10);

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
                  <DisplayTickets page={currentPage} />
                  <div className="flex justify-center w-full my-4 ">
                    <Pagination pages={pages} currentPage={currentPage} />
                  </div>
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
