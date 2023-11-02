import React from "react";
import Image from "next/image";
import { BiSolidHome } from "react-icons/bi";
import { FaTicketAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
const Aside = () => {
  return (
    <div className="flex">
      <aside className="flex flex-col z-10 justify-between fixed mr-[7px] text-center min-h-[100%] p-[1px] md:p-[7px] bg-[#0a2c0a] border-r-[1px] border-r-solid border-r-grey">
        <div className="icon">
          <div className="owner logo flex justify-center mb-[25px] cursor-pointer hover:bg-[#817d7d] hover:rounded-[15px]">
            <Image src="/images/own3rsm.png" alt="Logo" width={35} height={45} priority />
          </div>
          <div className="icons flex flex-col justify-between h-[25vh]">
            <Link href="/" className="cursor-pointer flex-col md:flex-row inline-flex text-[17px] md:text-[22px] items-center hover:text-[#4b4ba7]">
              <BiSolidHome className="text-[30px]" />
              <label className="ml-[2px] md:ml-[7px] cursor-pointer block md:hidden"> Home </label>
            </Link>
            <Link href="/new" className="cursor-pointer flex-col md:flex-row inline-flex text-[17px] md:text-[22px]  items-center hover:text-[#4b4ba7]" >
              <FaTicketAlt className="text-[30px]" />
              <label className="ml-[2px] md:ml-[7px] cursor-pointer block md:hidden"> New </label>
            </Link>
            <Link href="/setting" className="cursor-pointer flex-col md:flex-row inline-flex text-[17px] md:text-[22px]  items-center hover:text-[#4b4ba7]" > 
            <FiUser className="text-[30px]" />
            <label className="ml-[2px] md:ml-[7px] cursor-pointer block md:hidden"> Profile </label>
            </Link>
          </div>
        </div>

        <div className="setting-icon icon mb-[40px]">
          <Link href="/setting" className="hover:text-[#4b4ba7] cursor-pointer inline-flex flex-col md:flex-row text-[16px] items-center" >
            <AiOutlineSetting className="text-[25px]" />
            <label className="ml-[2px] md:ml-[7px] cursor-pointer block md:hidden"> Setting </label>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
