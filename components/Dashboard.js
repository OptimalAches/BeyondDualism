"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { updateProfile, fetchuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setform] = useState({})

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
    else {
      getData()
    }
  }, [router, session])

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    toast.success('Profile Updated!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  }

  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className='dashboard container mx-auto py-5'>

        <div className="welcome text-center py-4">
          <h1 className='font-bold text-2xl px-5 md:px-0'>Welcome to your Dashboard</h1>
        </div>

        <form className="entries flex flex-col gap-2 items-center" action={handleSubmit}>

          <div className="name w-1/3">
            <label htmlFor="name" className='font-semibold text-base mb-1'>Name</label>
            <input value={form.name ? form.name : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="name" id="name" />
          </div>
          <div className="email w-1/3">
            <label htmlFor="email" className='font-semibold text-base mb-1'>Email</label>
            <input value={form.email ? form.email : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="email" id="email" />
          </div>
          <div className="username w-1/3">
            <label htmlFor="username" className='font-semibold text-base mb-1'>Username</label>
            <input value={form.username ? form.username : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="username" id="username" />
          </div>
          <div className="profilepic w-1/3">
            <label htmlFor="profilepic" className='font-semibold text-base mb-1'>Profile Picture</label>
            <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="profilepic" id="profilepic" />
          </div>
          <div className="coverpic w-1/3">
            <label htmlFor="coverpic" className='font-semibold text-base mb-1'>Cover Picture</label>
            <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="coverpic" id="coverpic" />
          </div>
          <div className="razorpayid w-1/3">
            <label htmlFor="razorpayid" className='font-semibold text-base mb-1'>Razorpay ID</label>
            <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="razorpayid" id="razorpayid" />
          </div>
          <div className="razorpaysecret w-1/3">
            <label htmlFor="razorpaysecret" className='font-semibold text-base mb-1'>Razorpay Secret</label>
            <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} className="w-full text-xs p-2 rounded-lg bg-blue-900" type="text" name="razorpaysecret" id="razorpaysecret" />
          </div>
          <button type="submit" className="w-1/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-xs p-2 text-center mt-7">Save</button>

        </form>

      </div>
    </>
  )
}

export default Dashboard