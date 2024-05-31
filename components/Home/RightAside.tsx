import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { BsGlobe2 } from "react-icons/bs";
import RightAsideLinks from "./RightAsideLinks";
import Image from "next/image";
const RightAside = ({ type, response }: { type: string, response?: {name: string, email?: string, phone?: string, lang?: string, avatar?: string | undefined} }) => {
  
  if (type === "newticket") {
    return (
    <div className="flex flex-col h-[100vh] md:w-[25%] w-[100%]">
            <RightAsideLinks />
    </div>
    )
  }


  return (
    <div className="flex flex-col h-[100vh] md:w-[25%] w-[100%]">
          <div className="asignee h-[50%] w-[100%] flex flex-col justify-start mt-[15px]">
            <div className="avatar flex items-center justify-center md:justify-start w-[90%] h-[80px]">
              {response?.name !== "Waiting..." ? <Image width={70} height={70}
                className="w-[70px] rounded-[100%] hover:brightness-75 cursor-pointer"
                src={response?.avatar || ""}
                alt=""
              /> :
              <Image width={70} height={70}
                className="w-[70px] rounded-[100%] hover:brightness-75 cursor-pointer"
                src="/images/bubble-gum-avatar-icon3.png"
                alt=""
              />
                }
              <div className="name ml-[10px] text-[1.25rem] font-[600] cursor-pointer hover:text-[#5e5a5a]">
              {response?.name}
              </div>
            </div>

            {response?.name === "Waiting..." ? (<div className="flex justify-center items-center mt-[15px] text-[1.2rem]">Waiting for a response...</div>) : (<div className="mt-[15px] flex justify-center flex-col">
              <h4>
                <a
                  className="flex items-center justify-center md:justify-start cursor-pointer mb-[7px] p-[4px] text-[1.1rem] text-[#f8f2f2] hover:text-[#5e5a5a]"
                  href={"mailto:" + response?.email}
                >
                  <AiOutlineMail className="mr-[5px]" /> {response?.email}
                </a>
              </h4>
              <h4>
                <a
                  className="flex items-center justify-center md:justify-start cursor-pointer mb-[7px] p-[4px] text-[1.1rem] text-[#f8f2f2] hover:text-[#5e5a5a]"
                  href={"tel://" + response?.phone}
                >
                  <BsTelephone className="mr-[5px]" /> {response?.phone}
                </a>
              </h4>
              <h4 className="flex items-center justify-center md:justify-start cursor-pointer mb-[7px] p-[4px] text-[1.1rem] text-[#f8f2f2] hover:text-[#5e5a5a]">
                <BsGlobe2 className="mr-[5px]" /> {response?.lang}
              </h4>
            </div>)
            }
          </div>
          <div className="line w-[100%] h-[3px] bg-[#202020]" />

      <RightAsideLinks />
    </div>
  );
};

export default RightAside;
