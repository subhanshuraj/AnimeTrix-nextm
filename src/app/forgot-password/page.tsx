"use client"
import Toast from '@/utils/toast'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { ClockLoader } from 'react-spinners'

const Page = () => {
    const [email, setEmail] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userData = {
                email: email
            };
            const response = await axios.post("/api/forgot-password", userData);
            console.log(response)
            Toast.SuccessshowToast(response.data.message || "Email to reset password sent");
        } catch (error: any) {
            Toast.ErrorShowToast(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className='flex min-h-[70vh] justify-center items-center'>
            <div className=' bg-white/20 shadow-md shadow-white/70 w-full md:w-1/2 2xl:w-1/3 m-4 md:m-auto p-4 rounded-lg'>
                <h1 className='font-semibold text-2xl text-center mb-5'>Lets recover whats lost</h1>
                <form autoComplete='false' className="flex flex-col gap-2" onSubmit={handleResetPassword}>
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className=' bg-transparent border-2 border-white/20 p-2 focus:outline-none  rounded-lg text-white' autoComplete='off' />
                    {
                        loading ? <button className=' font-semibold flex gap-3 p-3  bg-white text-black rounded-lg items-center justify-center' disabled={true}>
                            <ClockLoader size={30} />
                            <span>Sending...</span>
                        </button> : (
                            <button className={` p-3 ${email != "" ? "bg-blue-600 cursor-pointer" : "bg-white/30 text-black cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${email != "" && "hover:bg-white"} hover:text-black`} disabled={email != "" ? false : true}>Send Email</button>
                        )
                    }
                </form>
            </div>
        </section>
    )
}

export default Page