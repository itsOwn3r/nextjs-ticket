import React, { ReactNode } from 'react'

type Props = {
    status: String,
    TicketNumber: String | undefined,
    text: String | undefined | ReactNode
}

const SubHeader = ({status, TicketNumber, text} : Props) => {
    const statusColor = status === "Open" || status === "Opening New Ticket" || status === "Dashboard" ? "text-[rgb(19_174_19)]" : "text-[#ad442a]"
  return (
    <div className="leading-[1.3rem] bg-[#6d6b6b63] my-[3px] p-[10px] rounded-[7px] flex items-center justify-between">
    <div className="flex items-center"><span className={statusColor + " border-solid border-[1px] border-[#707070] p-[5px] rounded-[5px]"}>{status}</span>
    <h2 className="text-[13px] md:text-[19px] font-[600] ml-[7px] border-solid border-b-[1px] border-b-[#707070]">{TicketNumber && 'Ticket #' + TicketNumber}</h2>
   </div>
   <div className="mr-[15px] text-[14px] md:text-[16px] text-center">
     {text && text}
   </div>
    </div>
  )
}

export default SubHeader