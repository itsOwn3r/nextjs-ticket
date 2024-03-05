"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
type blobing =  { img: Blob | MediaSource | string}[];
let allArr: blobing = [];

interface SendProps{
  type?:string;
  setMessageValue?: Dispatch<SetStateAction<string>>;
  getFormData?: Dispatch<SetStateAction<blobing>>;
  id?: string;
  name?: string;
  avatar?:string | null;
  email?:string;
  userType?: string;
}

const Send = ({type, setMessageValue, getFormData, id, name, email, avatar, userType}: SendProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<blobing>([{img: ""}]);
  const router = useRouter();

  const submitHandler = async (text: string) => {
    try {

      setIsLoading(true)

      if (text === "" && allArr.length < 1) {
        return;
      }

      let formData:any = new FormData();
      if (previewImg.length >= 1) {
        for(let image of previewImg){
          if (typeof image.img !== "string") {
            formData.append("files", image.img)
          }
        }
      }

      const dataObj = {
        id: id,
        text: text,
        name: name,
        email: email,
        avatar: avatar || null,
        type: userType || null,
        date: Math.ceil(Date.now() / 1000)
      }

      formData.append("message", JSON.stringify(dataObj));
      document.querySelector("#sendbtn")?.classList.add("animate-spin");

      const res = await fetch("/api/message", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        document.querySelector("#sendbtn")?.classList.remove("animate-spin");
        setMessage("");
        setPreviewImg([{img: ""}]);
        router.refresh();
      }else{
        document.querySelector("#sendbtn")?.classList.remove("animate-spin");
      }

    } catch (error) {
      alert((error as Error).message)
    } finally {
      setIsLoading(false)
    }
    
  };
  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.type === "change") {
      // const fileInput = e.target
      const fileInput = e.target;
      let files = fileInput.files;

      let filesLength = files!.length;
      if (filesLength > 3) {
        return;
      }
      for (let i = 0; i < filesLength; i++) {
        let file = files![i];
        allArr.push({
          img: file,
        });
      }

      setPreviewImg([...allArr]);
      if (getFormData === undefined) {
        return;
      }
      type === "newticket" &&  getFormData([...allArr])
    }
  };
  return (
    <>
    <div className={`mt-[40px] flex items-center justify-center sticky left-0 right-0 bottom-0 w-[inherit] ${type !== "newticket" && 'bg-[rgb(0_0_0_/_84%)]'} rounded-[15px_0]`}>
      <div className="wrapper relative flex justify-center items-center">

        <div>
          <input disabled={isLoading} onChange={(e) => inputHandler(e)} type="file" max="3" multiple name="files[]" id="input" className="opacity-0 w-7 h-full absolute p-[15px] m-[5px] cursor-pointer z-20" />
          <ImAttachment className="w-[24px] h-[24px] md:mx-[10px] cursor-pointer" />
        </div>
      </div>
      <form className="mb-[24px] flex flex-col w-[85%] md:w-[65%] text-center mx-[10px]">
        <span>{type === "newticket" ? "Tell Us About It:" :  'New Message?'}</span>
        <textarea disabled={isLoading} onChange={(e) => { 
          if (setMessage) {
            setMessage(e.target.value)  
          }
          
         (type === "newticket" && setMessageValue) && setMessageValue(e.target.value)
        }
          }  value={message} name="message" id="message" className="w-[100%] bgnone border-solid border-[1px] border-[#bbb] text-[#fff] p-[3] rounded-[10px] leading-[2] md:leading-[3]" />
      </form>
      {type !== "newticket" &&
      <button disabled={isLoading} className="w-[30px] h-[30px]" onClick={() => submitHandler(message)} >
        <FiSend id="sendbtn" className="w-full h-full" />
      </button>
}
    </div>
      <div className="flex justify-center">
        {previewImg &&
          previewImg.map((img, i) => (
            <React.Fragment key={i}>
              {typeof img.img !== "string" ? (
                <div className="relative cursor-pointer inline-flex w-[75px] h-[75px] items-center justify-center border-dashed border-[1px] border-black ">
                  <Image
                    className="absolute top-0 w-full h-full picHolder"
                    src={URL.createObjectURL(img.img)}
                    fill
                    alt=""
                  />
                  <div className="absolute right-[1%] z-50 top-0 rounded-[50%] h-[20px] w-[20px] text-[0.85rem] text-right">
                    <Image
                    fill
                      className="remove z-50"
                      onClick={() => {
                        setPreviewImg(previewImg.filter((item: any) => item.img !== img.img)
                        );
                        (type === "newticket" && getFormData) && getFormData(previewImg.filter((item: any) => item.img !== img.img))
                        allArr = allArr.filter((item) => item.img !== img.img);
                      }}
                      src="/images/remove.png" alt="Delete?"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
      </div>
      </>
  );
};

export default Send;
