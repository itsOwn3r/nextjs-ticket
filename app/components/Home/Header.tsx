"use client"
import React from "react";
import { BsSearch } from "react-icons/bs";
import { BsChatLeftTextFill } from "react-icons/bs";
import { BsChatSquare } from "react-icons/bs";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Header = () => {
  const session = useSession()
  return (
    <header>
      <div className="flex justify-between">
        <div className="flex h-[60px] w-full">
          <div className="flex items-center leading-6 w-[10em] cursor-pointer border-b-[1px] border-b-[#686868] border-solid border-r-[1px] border-r-[#686868]">  
            {/*name of agent*/}
            <div className="flex justify-center items-center bg-[rgb(79,134,100)] w-[30px] h-[30px] rounded-[50%] hover:scale-125">
              <BsChatSquare />
            </div>
            <div className="conversation flex md:flex-col ml-[7px] cursor-pointer hover:text-[rgb(79,134,100)]">
              <h3>Hello </h3>
              <p className="ml-[3px] md:ml-[unset]">{session?.data?.user?.name || ''}</p>
            </div>
          </div>
          <Link href="/new" className="leading-6 items-center hidden md:flex p-[7px] cursor-pointer hover:text-[rgb(79,134,100)]">+ Add</Link>
        </div>

        <div className="flex items-center text-[18px] justify-end w-[15em] m-[0_7px] mr-[25px]">
          <div className="search flex justify-center flex-1 p-[7px] md:p-[10px] m-[0_7px] border-solid border-b-[1px] border-b-[#707070] cursor-pointer hover:border-none hover:scale-125">
            <BsSearch />
          </div>

          <div className="chat p-[7px] md:p-[10px] border-solid border-b-[1px] border-b-[#707070] cursor-pointer hover:border-none hover:scale-125">
            <BsChatLeftTextFill />
          </div>

          <div className="call p-[7px] md:p-[10px] m-[0_7px] border-solid border-b-[1px] border-b-[#707070] cursor-pointer hover:border-none hover:scale-125">
            <LuPhoneCall />
          </div>

          <div onClick={() =>  signOut({ callbackUrl: '/login' })} className="user p-[7px] md:p-[10px] m-[0_7px] border-solid border-b-[1px] border-b-[#707070] cursor-pointer hover:border-none hover:scale-125">
            <HiOutlineLogout />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
