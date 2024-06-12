"use client"
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { BsClockHistory, BsPersonFillAdd, BsPersonFillCheck } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { FaSpinner } from "react-icons/fa"
import { getDate } from "../dateHandler";

import Chat from "../Chat/Chat";
import Send from "../Chat/Send";
import RightAside from "./RightAside";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Ticket } from "@prisma/client";


const Content = ({ ticket, type, documentTitle }: {ticket?: Ticket, type: string, documentTitle?: string | undefined }) => {
  type blobing =  { img: Blob | MediaSource | string}[];
  const user = useSession()


  const [tags, setTags] = useState<string[]>([])
  const [tagValue, setTagValue] = useState("")
  const [title, setTitle] = useState("")
  const [pics, setPics] = useState<blobing>([{img: ""}])
  const [messageValue, setMessageValue] = useState<string>("")
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (documentTitle) {
      document.title = documentTitle + " - Ticketing System"
    }
      if (ticket) {
        if (ticket.tag.length > 0) {
          setTags(ticket.tag)
        }
      }
  },[documentTitle, ticket])
const handleTags = () =>{
  if (tagValue !== "") {
    if (tags.length > 4) {
      return;
    }
    let finalTagValue = tagValue.replaceAll(" ", "|")
    setTags([...tags, finalTagValue])
  }
  setTagValue("")
}
const depRef = useRef<HTMLSelectElement>(null)
const prioRef = useRef<HTMLSelectElement>(null)



const getFormData = (data:SetStateAction<blobing>) => {
setPics(data)
}

const openHandler = async () => {
    if (title === "" || (messageValue === "" && pics[0]["img"].toString().length < 1)) {
      return;
    }
    let formData:any = new FormData();
    if (pics.length >= 1) {
      for(let image of pics){
        if (typeof image.img !== "string") {
          formData.append("files", image.img)
        }
    }
    }
    const initialTicketValue = [{
      user: user!.data!.user!.email,
      name: user!.data!.user!.name,
      avatar: user!.data!.user!.avatar || null,
      images : [],
      text: messageValue,
      date: Math.round(Date.now() / 1000)
    }]
    const data = {
      title: title,
      ticket: initialTicketValue,
      opener: user!.data!.user!.name,
      openerEmail: user!.data!.user!.email,
      department: depRef.current!.value!,
      priority: prioRef.current!.value!,
      tags: tags,
    }
    formData.append("data", JSON.stringify(data));
    try {
      setIsLoading(true);
      const res = await fetch("/api/ticket", {
        method: "POST",
        body: formData,
      });
      const response = await res.json()
      if (response.success) {
        // setMessageValue("")
        //redirect
        if (response.path) {
          const url = "/ticket/" + response.path
          router.replace(url)
        }
      }      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

}

const closeHandler = async () => {
  try {
    if (confirm("Are you sure you want to close this ticket?")) {
      if (document.querySelector("#animateHolder")) {
        document.querySelector("#animateHolder")?.classList.add("animate-spin")
      }
        const req = await fetch("/api/close",{
          method: "POST",
          body: JSON.stringify({
            ticket: ticket?.id,
            user: user!.data!.user!.email,
            type: user!.data!.user!.type
          })
        })
      const res = await req.json()
      if (res.success) {
        router.refresh()
      }
      }
  } catch (error) {
    console.error(error)
  }
}




const numberOfTickets = ticket?.ticket.length
const timeAgo = getDate(ticket?.date!)

  const rawJsonValueResponder = JSON.stringify(ticket?.responder[ticket?.responder?.length - 1]) || JSON.stringify({name: "Waiting..."});

  const responder = JSON.parse(rawJsonValueResponder)

if (user.status === "loading") {
  return <div className="flex fixed w-full h-full justify-center items-center"><FaSpinner className="animate-spin text-[4rem]" /></div>
}else if (user.status === "unauthenticated") {
  router.replace("/login")
}
  return (
    <main className="flex flex-col md:flex-row justify-between px-[7px] md:px-[20px] h-full">
      <div className="flex justify-between flex-col h-[35vh] md:h-[60vh]">
        <section className="flex md:block basicInfo">
          <div className="holder">
            <h5 className="mt-[10px]">Requester:</h5>
            <div className="bg-[#797979] rounded-[10px] flex p-[5px] min-w-max w-[30vw] md:w-[20vw]">
              <span className="mx-[5px] flex items-center">
                <BsPersonFillCheck />
              </span>
              <span className="mr-[10px] text-[18px] text-[#202020] font-[800]">
               {type === "newticket" ? user!.data!.user!.name : ticket?.userName}
              </span>
            </div>
          </div>

          {type === "ticket" && <div className="holder">
            <h5 className="mt-[10px]">Assignees:</h5>
            <div className="bg-[#797979] rounded-[10px] flex p-[5px] min-w-max w-[30vw] md:w-[20vw]">
              <span className="mx-[5px] flex items-center">
                <BsPersonFillAdd />
              </span>
              <span className="mr-[10px] text-[18px] text-[#202020] font-[800]">
              {responder?.name}
              </span>
            </div>
          </div>}
        </section>

        <section className="flex md:block basicInfo">
          <div className="holder">
          <h5 className="mt-[10px]">Department:</h5>

          {type === "ticket" && <select defaultValue={ticket?.department} name="department" id="department" disabled className="w-[30vw] md:w-[20vw] bg-zinc-700 p-[7px] rounded-[7px]">
            <option value="sales">Sales</option>
            <option value="shipment">Shipment</option>
            <option value="accounting">Accounting</option>
          </select>}

          {type === "newticket" && <select disabled={isLoading} defaultValue={"shipment"} ref={depRef} name="department" id="department" className="w-[30vw] md:w-[20vw] bg-zinc-700 p-[7px] rounded-[7px]">
            <option value="sales">Sales</option>
            <option value="shipment">Shipment</option>
            <option value="accounting">Accounting</option>
          </select>}

          </div>

          <div className="holder">
            <h5 className="mt-[10px]">Priority:</h5>
            {type === "ticket" &&           
            <select
              name="priority"
              id="priority"
              disabled
              defaultValue={ticket?.priority}
              className="w-[30vw] md:w-[20vw] bg-zinc-700 p-[7px] rounded-[7px]"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>}

          {type === "newticket" &&           
            <select
              name="priority"
              defaultValue="medium"
              disabled={isLoading}
              ref={prioRef}
              id="priority"
              className="w-[30vw] md:w-[20vw] bg-zinc-700 p-[7px] rounded-[7px]"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>}

          </div>
          
        </section>

        <section className="flex md:block tags">
          <div className="holder">
            <h5 className="mt-[10px]">Tags:</h5>
            <div className={`bg-[#d5d5d5] overflow-clip hover:overflow-visible rounded-[10px] flex w-[50vw] md:w-[20vw] ${type === "newticket" ? " w-[50vw]" : "w-[35vw]"}`}>
        <input value={tagValue} onChange={e => setTagValue(e.target.value)} onBlur={() => 
        handleTags() 
      }
          onKeyDown={e => e.key === "Enter" && handleTags() }
           type="text" name="tag" placeholder="type + enter" disabled={(type === "ticket" || isLoading) ? true : false} className="bg-[#d5d5d5] text-[#000] rounded-[10px] outline-none w-[100%] p-[5px]"/>
        
        <div className="holderOfSpans flex rtl justify-center items-center bg-transparent">

        {tags.map((tag, i) => {

          return <span key={i} onClick={() => {
            if (type === "newticket") {
              const newTags = tags.filter(item => item !== tag)
              setTags(newTags)
            }
            
          }}
          
          className="bg-[#bebebe] hover:bg-[#918e8e] select-none mr-[5px] text-[#000] px-[5px] rounded-[10px] flex items-center cursor-pointer hover:text-[#434343]">
                {tag}
              </span>
        })} 
        </div>
            </div>
          </div>

          {(type === "ticket" && ticket?.status !== "closed") && <div className="holder">
            <h5 className="mt-[10px]">Close ticket?</h5>
            <div onClick={closeHandler} className="bg-[#797979] rounded-[10px] flex justify-center p-[5px] min-w-max w-[30vw] md:w-[20vw] cursor-pointer hover:bg-[#b4b3b3e0] ">
              <span id="animateHolder" className="mx-[5px] text-[#000] flex items-center">
                <IoMdClose />
              </span>
              <span className="mr-[10px] text-[18px] text-[#e7a200] font-[500] tracking-[1px]">
                Close?
              </span>
            </div>
          </div>}


        </section>
      </div>

      <div className="w-[100%] px-[5px] md:px-[15px] mt-[15px]">
        <div className="conversation w-[100%] p-[7px] bg-[#5656567a] rounded-[7px]">
          <div className="flex flex-col">
            {type !== "newticket" ? (
              <>
                <h3 className="text-[20px] m-[0_0_7px_5px]">
                  {ticket ? ticket.title : "loading..."}
                </h3>

                <div className="flex justify-between summry">
                  <div className="wrapper flex pl-[10px] min-w-[33%] w-[100%]">
                    <p className="mr-[5%] md:tracking-[1px]">{timeAgo}</p>
                    <p className="mr-[5%] md:tracking-[1px]">{numberOfTickets} Messages</p>
                    <p className="mr-[5%] md:tracking-[1px]">
                      <span className={(ticket?.status === "closed" ? "bg-[#a72c2c] " : "bg-[#13ae13] ") + "inline-block w-[10px] h-[10px] rounded-[50%] mr-[4px]"}></span>
                      {ticket?.status === "closed" ? "Closed" : "Active"}
                    </p>
                  </div>
                  <div className="hidden md:inline-flex">
                    <span className="mr-[7px] cursor-pointer hover:scale-125">
                      <BiFilterAlt />
                    </span>
                    <span className="mr-[7px] cursor-pointer hover:scale-125">
                      <BsClockHistory />
                    </span>
                    <span className="mr-[7px] cursor-pointer hover:scale-125">
                      <SlOptionsVertical />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
              <span className="text-center text-[20px] font-[500] my-[5px]">Enter ticket&apos;s title:</span>
              <div className="flex w-[100%] justify-center ">
              <input disabled={isLoading} type="text" onChange={e => setTitle(e.target.value)} name="title" className="p-[12px] w-[75%] md:w-[50%] flex justify-center rounded-[10px] text-[#000] font-[600] text-[16px]" placeholder="Ticket's Title" />
              </div>
              <Send type="newticket" getFormData={getFormData} setMessageValue={setMessageValue} />
              <div className="flex justify-center">
                <button disabled={isLoading} onClick={openHandler} className={`p-[15px_30px] text-[19px] mt-[15px]  rounded-[10px] ${isLoading ? 'bg-[#3f3f3f] hover:bg-[#353535]' : 'bg-[#178717] hover:bg-[#04ad04]' }`}>{isLoading ? "Opening Ticket..." : "Open Ticket"}</button>
              </div>
        
              </>
            )}
          </div>
        </div>
        {type === "ticket" &&
        <>
        <div className="messages flex flex-col mt-[15px]">
          {ticket ? ticket.ticket.map((ticket, i) => {
            const rawTicket = JSON.stringify(ticket);
            const parsedTicket = JSON.parse(rawTicket);
            return <Chat key={i}
            name={parsedTicket?.name}
            username={user!.data!.user!.name!}
            avatar={parsedTicket?.avatar || undefined}
            text={parsedTicket?.text}
            attachment={parsedTicket?.images}
            date={parsedTicket?.date}
          />

          }) : "Loading..."}
        </div>
        {ticket?.status !== "closed" && <Send type="ticket" id={ticket?.id} name={user!.data!.user!.name!} avatar={user!.data!.user!.avatar!} email={user!.data!.user!.email!} userType={user!.data!.user!.type} />}
        </>
}

      </div>

      <RightAside type={type} response={responder} />
    </main>
  );
};

export default Content;
