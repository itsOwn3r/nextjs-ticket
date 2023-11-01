"use client";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiEye } from "react-icons/fi";
const RightAsideLinks = () => {
  const [displayed, setDisplayed] = useState(true);
  return (
    <div className="h-[50%] select-none">
      <div
        onClick={() => setDisplayed(!displayed)}
        className="w-[100%] p-[10px] flex justify-between rounded-[12px] mt-[7px] items-center cursor-pointer hover:bg-[#202020]"
      >
        <span>Useful Links</span>
        {displayed && (
          <span style={{ rotate: "180deg" }}>
            <MdOutlineKeyboardArrowDown />
          </span>
        )}
        {!displayed && (
          <span style={{ display: "block" }}>
            <MdOutlineKeyboardArrowDown />
          </span>
        )}
      </div>

      {displayed && (
        <>
          <div className="px-[13px]">
            <div className="flex items-center w-[100%] cursor-pointer hover:text-[#ce7b55] my-[10px]">
              <FiEye className="mr-[10px]" /> FAQs
            </div>
            <div className="flex items-center w-[100%] cursor-pointer hover:text-[#ce7b55] my-[10px]">
              <FiEye className="mr-[10px]" /> Shipments
            </div>
            <div className="flex items-center w-[100%] cursor-pointer hover:text-[#ce7b55] my-[10px]">
              <FiEye className="mr-[10px]" /> Return Policy
            </div>
            <div className="flex items-center w-[100%] cursor-pointer hover:text-[#ce7b55] my-[10px]">
              <FiEye className="mr-[10px]" /> Terms of Service
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RightAsideLinks;
