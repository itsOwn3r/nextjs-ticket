"use client"
import React from 'react'
import Link from 'next/link'
import { BsFillChatQuoteFill } from 'react-icons/bs'
import { getDate } from '@/components/dateHandler'


type TicketProps = {
    id: string,
    title: string,
    ticketStatus?: string | undefined | null,
    department?: string,
    date: number,
    priority?: string,
    tag?: string[],
    length?: number,
    type: string,
    lastResponder?: string
    message?: string
}


const Ticket = ({id, title, message, ticketStatus, department, date, priority, tag, length, type, lastResponder} : TicketProps) => {
      let priorityDiv;
      if (priority) {
        if (priority === "high") {
           priorityDiv = <div className='mr-1 w-[10px] h-[10px] rounded-[50%] bg-[red]'></div>
        } else if(priority === "medium"){
            priorityDiv = <div className='mr-1 w-[10px] h-[10px] rounded-[50%] bg-[orange]'></div>
        }else{
            priorityDiv = <div className='mr-1 w-[10px] h-[10px] rounded-[50%] bg-[green]'></div>
        }
      }

  return (
    <div className="flex justify-center items-center overflow-hidden w-[100%] p-[8px] md:p-5 border-b border-[#333]">
            
        
        <div className="w-full flex flex-col md:flex-row">
            <div className='flex items-center w-full'>
                {priority && priorityDiv}
                {type === "recent" && <BsFillChatQuoteFill className="mr-[10px]" />}

                <div className="flex justify-evenly items-center w-full flex-col md:flex-row">
                    <Link href={"/ticket/" + id} className='flex items-center justify-evenly w-full hover:text-[#888787] hover:scale-105'>

                        <div className='ticketTitle w-[60%]'>
                            <div className='flex mr-[20px]'>
                                {title}
                            </div>
                            {message && <div className='text-[14px] text-zinc-400 truncate max-w-[250px] md:max-w-[400px]'>{lastResponder && `${lastResponder}: `}{message}</div>}
                        </div>

                        <div className='flex flex-col text-center'><span>{department}</span>
                        {length && length + " msg"}
                        </div>
                    </Link>

                    <span className='text-[15px] text-zinc-400 w-full md:w-[100px] text-center'>
                        {getDate(Number(date))}
                    </span>                      
                </div>



            </div>

            {/* <div className="w-full flex justify-between items-center">
                {type === "recent" ? (
                <div className=''>
                   
                </div>) : (<></>)}
                <span className='md:text-[16px] text-[13px] text-zinc-400'>
                    {getDate(Number(date))}
                </span>                
        </div> */}
            </div>
    </div>
  )
}

export default Ticket