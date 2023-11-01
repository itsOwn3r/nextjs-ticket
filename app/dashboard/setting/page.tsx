"use client"
import Aside from "@/app/components/Home/Aside";
import Header from "@/app/components/Home/Header";
import SubHeader from "@/app/components/Home/SubHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
type blobing =  { img: Blob | MediaSource | string}[];
let allArr: blobing = []
const Setting = () => {
    const [previewImg, setPreviewImg] = useState<blobing>([{img: ""}]);
    const router = useRouter()
    const session = useSession()
    const [error, setError] = useState(null)
    const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
          // const fileInput = e.target
          const fileInput = e.target;
          let files = fileInput.files;
          allArr = []
          let filesLength = files!.length;
          if (filesLength > 1) {
            return;
          }
          for (let i = 0; i < filesLength; i++) {
            let file = files![i];
            allArr.push({
              img: file,
            });
            setPreviewImg([{
                img: file,
              }]);
        }
        
      };



    const submitHandler = async (text: string) => {
        let formData:any = new FormData();
        if (previewImg.length >= 1) {
          for(let image of previewImg){
          if (image !== "") {
            formData.append("files", image.img)
          }
        }
        }

        const dataObj = {
            user: session?.data?.user?.email
          }
              formData.append("message", JSON.stringify(dataObj));
          try {
              const res = await fetch("/api/avatar", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json()
                if (data.success === false) {
                    if (data.Error.cause.message) {
                        setError(data.Error.cause.message)
                    }
                }
                if (data.success) {
                    setError(null)
                  setPreviewImg([{img: ""}])
                    session.update({avatar: data.avatar})
                  router.refresh()
                }   
          } catch (error) {
            setError(error?.message)
          }
    }

  return (
    <>
    <title>Setting - Dashboard</title>
      <Aside />
      <div className="full-width">
        <div className="wrapper h-full">
          <Header />
          <SubHeader status="Setting" text="" />

          <div className="flex w-full h-full justify-center">
            <div className="rounded-[10px] w-[50%] flex justify-center flex-col items-center">
                {error && <p className="mb-[10px]">{error}</p>}
                <div className="relative cursor-pointer inline-flex mt-[20px] w-[120px] h-[120px] items-center justify-center border-dashed border-[1px] border-black ">
                  {session?.data?.user?.avatar ? <img
                    className="absolute top-0 w-full h-full rounded-[40%] picHolder"
                    src={session.data?.user.avatar}
                    alt=""
                  /> : <img
                    className="absolute top-0 w-full h-full rounded-[40%] picHolder"
                    src="/images/bubble-gum-avatar-icon3.png"
                    alt=""
                  />}

                </div>
              <p>Want to change your Avatar?</p>
              <div className="w-full relative flex justify-center mt-[15px]">
                    <input className="opacity-0 absolute w-[45%] py-[8px] cursor-pointer" type="file" name="avatar" id="" onChange={inputHandler} />
                <span className="bg-[#3177b1] w-[45%] flex justify-center py-[8px] cursor-pointer rounded-[10px]">Select a file</span>
              </div>
              {previewImg &&
          previewImg.map((img, i) => (
            <React.Fragment key={i}>
              {img.img !== "" ? (
               <>
               <div className="relative cursor-pointer inline-flex mt-[20px] w-[120px] h-[120px] items-center justify-center border-dashed border-[1px] border-black ">
                  <img
                    className="absolute top-0 w-full h-full rounded-[40%] picHolder"
                    src={URL.createObjectURL(img.img)}
                    alt=""
                  />

                </div>

                <div className="mt-[20px] flex flex-col w-[10em] text-center">
                        Looks good?
                        <button onClick={submitHandler} className="bg-[green] text-[22px] p-[5px] font-[600] rounded-[10px]">Yes!</button>
                  </div>

                  </>
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
