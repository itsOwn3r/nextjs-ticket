"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { FaSpinner } from "react-icons/fa"
const LogUp = ({type}: {type: string}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<null | string>(null)
  const router = useRouter()
  const submitHanlder = async (e:FormEvent) =>{
    e.preventDefault()
    try {
      if (email === "" || !email.includes("@") || !email.includes(".") || email.length < 8  || password.length < 8) {
        if (error === "Please Enter All The Required Data Correctly!") {
         if (document.querySelector("p.fadein")?.classList.contains("text-white")) {
            document.querySelector("p.fadein")?.classList.remove("text-white")
            document.querySelector("p.fadein")?.classList.add("text-[#808080]");
          }else{
          document.querySelector("p.fadein")?.classList.remove("text-[#808080]")
            document.querySelector("p.fadein")?.classList.add("text-white");
          }
        } else {
          setError("Please Enter All The Required Data Correctly!")
        }
        return;
      }
      if (type === "signup") {
        if(name.length < 3) {
          setError("Please Enter All The Required Data Correctly!")
          return;
        }
          setError(<FaSpinner className="animate-spin text-[2rem]" />)
       const req = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify({name:name, email:email, password: password})
        })
        const data = await req.json()
        if (data.success) {
          // router.replace("dashboard")
          const login = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
          })
          if (login?.status == 200) {
            // push('/')
            router.replace("dashboard")
          }
        }else{
          if (data.error) {
            setError(data.error.meta.target)
          }
        }
      }else{
        setError(<FaSpinner className="animate-spin text-[2rem]" />)
      // siging in
      const res = await signIn('credentials', {
        email: email, 
        password: password,
        redirect: false 
      })
      if (res?.status == 200) {
        setError("")
        router.replace("dashboard")
      } else {
          setError("Wrong credentials!")
      }
    }} catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    document.title = 'Log Into your account or Sign Up'
  },[])
  return (
    <div className="flex flex-col min-h-[100vh] w-full justify-center items-center">
        <div className="loginForm flex justify-center w-[100%]">
          <div className='holder  bg-[#1d1b1b] min-h-[400px] w-[90%] md:w-[35%] rounded-[15px]'>
          <form onSubmit={submitHanlder} className='flex flex-col w-full justify-center items-center'>
            <div className='flex flex-col w-[75%] md:w-[50%]'>
            {error && <p className='text-[20px] flex justify-center text-center fadein text-white'>{error}</p>}

           {type === "signup" && <> <label htmlFor="name" className='mt-[10px] ml-[6px] text-[#fff]'>Full Name:</label>
            <input type="text" id='name' onChange={e => setName(e.target.value)} className='bg-[#323232] text-[#fff] outline-none p-[7px] rounded-[7px]' name="name" placeholder='John Doe'/>
            </>}
            <label htmlFor="email" className='mt-[10px] ml-[6px] text-[#fff]'>Email:</label>
            <input type="text" id='email' onChange={e => setEmail(e.target.value)} className='bg-[#323232] text-[#fff] outline-none p-[7px] rounded-[7px]' name="email" placeholder='email@email.com'/>

            <label className='mt-[15px] ml-[6px] text-[#fff]' htmlFor="password">Password:</label>
            <input type="password" id='password' onChange={e => setPassword(e.target.value)} className='bg-[#323232] text-[grey] outline-none p-[7px] rounded-[7px]' name="password"/>
            </div>
            {type === "signup" ? <div className='mt-[7px] mb-[10px]'>Already have an account? <Link className='text-[orange]' href={"/login"}>Login</Link></div> : <div className='mt-[7px] mb-[10px]'>Don&apos;t have an account? <Link className='text-[orange]' href={"/signup"}>Sign up</Link></div>}
            <button className='mt-[10px] px-[40px] py-[10px] text-[22px] bg-slate-700 rounded-[12px] cursor-pointer hover:bg-slate-500' type="submit">{type === "signup" ? "Sign Up" : "Login"}</button>
          </form>

          </div>
        </div>
    </div>
  )
}

export default LogUp