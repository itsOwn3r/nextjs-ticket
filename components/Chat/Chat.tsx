import React from 'react'
import { getDate } from '../dateHandler'
import Image from 'next/image'

export interface Message{
    name: string,
    avatar: string | undefined,
    text: string,
    attachment?: string[],
    username: string,
    date: number,
}

const Chat = ({name, avatar, text, date, username, attachment} : Message) => {


  return (
    <div className='message flex-col w-[100%] mt-[7px] mb-[10px] flex justify-start items-start'>
     <div className='flex items-center w-[100%] justify-between'>
        <div className="wrapper flex justify-center items-center">
    <Image width={60} height={60} className='w-[50px] rounded-[50%]' src={avatar === undefined ? "/images/bubble-gum-avatar-icon2.png" : avatar} alt="avatar" />
     <h4 className='name text-[20px] font-[500] ml-[10px]'>{name}</h4>
        </div>
     <div>{getDate(date)}</div>
     </div>
     <p className='mt-[5px]'>{text}</p>
     {attachment && <p className='flex justify-center items-center w-[100%] max-h-[200px]'>
      {attachment.map((img, i) => {
     return <React.Fragment key={i}><Image  width={60} height={60} className='max-h-[200px]' src={img} alt='' /> <br /></React.Fragment>
     })}</p>}
     <span className='w-[100%] h-[0.75px] bg-[#333] my-[3px]' />
     </div>
  )
}

export default Chat