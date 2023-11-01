/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { BsGlobe2 } from "react-icons/bs";
import RightAsideLinks from "./RightAsideLinks";
const RightAside = ({ type, response }: { type: string, response: {name: string, email: string, phone: string, lang: string, avatar: string | null}[] }) => {
  return (
    <div className="flex flex-col h-[100vh] md:w-[25%] w-[100%]">
      {type === "ticket" && (
        <>
          <div className="asignee h-[50%] w-[100%] flex flex-col justify-start mt-[15px]">
            <div className="avatar flex items-center justify-center md:justify-start w-[90%] h-[80px]">
              {response?.length > 0 ? <img
                className="w-[70px] rounded-[100%] hover:brightness-75 cursor-pointer"
                src={response[response?.length - 1]?.avatar}
                alt=""
              /> :
              <img
                className="w-[70px] rounded-[100%] hover:brightness-75 cursor-pointer"
                src="/images/bubble-gum-avatar-icon3.png"
                alt=""
              />
                }
              <div className="name ml-[10px] text-[1.25rem] font-[600] cursor-pointer hover:text-[#5e5a5a]">
              {response?.length > 0 ? response[response?.length - 1]?.name : "*******"}
              </div>
            </div>

            {response?.length > 0 ?<div className="mt-[15px] flex justify-center flex-col">
              <h4>
                <a
                  className="flex items-center justify-center md:justify-start cursor-pointer mb-[7px] p-[4px] text-[1.1rem] text-[#f8f2f2] hover:text-[#5e5a5a]"
                  href={"mailto:" + response[response?.length - 1]?.email}
                >
                  <AiOutlineMail className="mr-[5px]" /> {response[response?.length - 1]?.email}
                </a>
              </h4>
              <h4>
                <a
                  className="flex items-center justify-center md:justify-start cursor-pointer mb-[7px] p-[4px] text-[1.1rem] text-[#f8f2f2] hover:text-[#5e5a5a]"
                  href={"tel://" + response[response?.length - 1]?.phone}
                >
                  <BsTelephone className="mr-[5px]" /> {response[response?.length - 1]?.phone}
                </a>
              </h4>
              <h4 className="flex items-center justify-center md:justify-start cursor-pointer mb-[7px] p-[4px] text-[1.1rem] text-[#f8f2f2] hover:text-[#5e5a5a]">
                <BsGlobe2 className="mr-[5px]" /> {response[response?.length - 1]?.lang}
              </h4>
            </div> : 
              <div className="flex justify-center items-center mt-[15px] text-[1.2rem]">Waiting for a response...</div>
            }
          </div>
          <div className="line w-[100%] h-[3px] bg-[#202020]" />
        </>
      )}

      <RightAsideLinks />
    </div>
  );
};

export default RightAside;
