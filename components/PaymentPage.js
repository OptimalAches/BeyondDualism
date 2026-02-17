// "use client"
// import React from 'react'
// import Script from 'next/script'
// import Image from 'next/image'
// import { initiate } from '@/actions/useractions'
// import { useState, useEffect, useCallback } from 'react'
// import { fetchuser } from '@/actions/useractions'
// import { fetchpayments } from '@/actions/useractions'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Bounce } from 'react-toastify'
// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'

// const PaymentPage = ({ username }) => {

//     const [paymentform, setpaymentform] = useState({})
//     const [currentUser, setcurrentUser] = useState({})
//     const [Payments, setPayments] = useState([])
//     const searchParams = useSearchParams()
//     const router = useRouter()

//     const handleChange = (e) => {
//         setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
//     }

//     const getData = useCallback(async () => {
//         let u = await fetchuser(username);
//         setcurrentUser(u);
//         let dbpayments = await fetchpayments(username);
//         setPayments(dbpayments);
//     }, [username]);

//     useEffect(() => {
//         getData()
//     }, [getData])

//     useEffect(() => {
//         if (searchParams.get("paymentdone") == "true") {
//             toast.success('Thanks for the donation!', {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         }
//         router.push(`/${username}`)
//     }, [router, searchParams, username])

//     // const getData = async (params) => {
//     //     let u = await fetchuser(username)
//     //     setcurrentUser(u)
//     //     let dbpayments = await fetchpayments(username)
//     //     setPayments(dbpayments)
//     // }

//     const pay = async (amount) => {
//         // Get the order Id
//         let a = await initiate(amount, username, paymentform)
//         let orderId = a.id
//         var options = {
//             "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
//             "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//             "currency": "INR",
//             "name": "BeyondDualism", //your business name
//             "description": "Test Transaction",
//             "image": "https://example.com/your_logo",
//             "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//             "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
//             "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//                 "name": "Gaurav Kumar", //your customer's name
//                 "email": "gaurav.kumar@example.com",
//                 "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
//             },
//             "notes": {
//                 "address": "Razorpay Corporate Office"
//             },
//             "theme": {
//                 "color": "#3399cc"
//             }
//         };
//         var rzp1 = new Razorpay(options);
//         rzp1.open();
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="colored"
//             />

//             <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

//             <div className='relative w-full h-[400px]'>
//                 <Image
//                     className='object-cover shadow-blue-700 shadow-2xl'
//                     src={currentUser.coverpic}
//                     alt="cover"
//                     layout="fill"
//                 />

//                 <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2 rounded-full border-2 border-white overflow-hidden w-32 h-32'>
//                     <Image
//                         className='object-cover'
//                         src={currentUser.profilepic}
//                         alt="profile"
//                         width={128}
//                         height={128}
//                     />
//                 </div>
//             </div>

//             <div className='info flex flex-col items-center justify-center gap-2 py-20'>

//                 <div className="font-bold text-xl">
//                     <span>@{username}</span>
//                 </div>
//                 <div className='text-slate-400'>
//                     <span>Let&apos;s help {username} in his mission!</span>
//                 </div>
//                 <div className='text-slate-400'>
//                     <span>{Payments.length} Payments • ₹{Payments.reduce((a, b) => a + (b.amount) / 100, 0)} raised</span>
//                 </div>

//                 <div className="payment flex flex-col md:flex-row gap-3 w-[80%] pt-6">
//                     <div className="supporters w-full md:w-1/2 bg-blue-950 text-white p-10 rounded-lg">
//                         <h2 className='text-2xl text-center md:text-left font-bold mb-2'>Top 10 Supporters</h2>
//                         <ul className='text-xs md:text-base'>
//                             {Payments.length == 0 && <li className='pt-4'>No payments yet!</li>}
//                             {Payments.map((p, i) => {
//                                 return (
//                                     <li key={i} className='pt-4 flex gap-2 items-center'>
//                                         <Image width={30} height={30} src="/fans.png" alt="fan" />
//                                         <span>
//                                             <span>{p.name} donated</span>
//                                             <span className='font-bold px-2 text-green-500'>₹{(p.amount) / 100}</span>
//                                             <span>with a message</span>
//                                             <span className='font-semibold px-2 text-green-500'>&quot;{p.message}&quot;</span>
//                                         </span>
//                                     </li>
//                                 )
//                             })}

//                             {/* <li className='pt-4 flex gap-2 items-center'>
//                                 <Image width={30} src="/user.gif" alt="user" />
//                                 <span>
//                                     <span>Divyansh donated</span>
//                                     <span className='font-bold px-2 text-green-500'>$30</span>
//                                     <span>with a message</span>
//                                     <span className='font-semibold px-2 text-green-500'>"Lots of &hearts;"</span>
//                                 </span>
//                             </li>
//                             <li className='pt-4 flex gap-2 items-center'>
//                                 <Image width={30} src="/user.gif" alt="user" />
//                                 <span>
//                                     <span>Divyansh donated</span>
//                                     <span className='font-bold px-2 text-green-500'>$30</span>
//                                     <span>with a message</span>
//                                     <span className='font-semibold px-2 text-green-500'>"Lots of &hearts;"</span>
//                                 </span>
//                             </li> */}

//                         </ul>
//                     </div>
//                     <div className="makePayment w-full md:w-1/2 bg-blue-950 text-white p-10 rounded-lg">
//                         <h2 className='text-2xl text-center md:text-left font-bold mb-6'>Make a payment</h2>
//                         <div className="flex flex-col gap-2">
//                             <input onChange={handleChange} value={paymentform.name} className='w-full rounded-lg p-3 bg-blue-900' type="text" placeholder='Enter Name' name="name" id="" />
//                             <input onChange={handleChange} value={paymentform.message} className='w-full rounded-lg p-3 bg-blue-900' type="text" placeholder='Enter Message' name="message" id="" />
//                             <input onChange={handleChange} value={paymentform.amount} className='w-full rounded-lg p-3 bg-blue-900' type="number" min="10" max="500000" placeholder='Enter Amount' name="amount" id="" />
//                             <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1 && paymentform.amount?.length > 1) ? false : true} onClick={() => { pay((paymentform.amount) * 100) }}>Pay</button>
//                         </div>
//                         <div className="flex gap-2 mt-2">
//                             <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1) ? false : true} onClick={() => { pay(1000) }}>Pay ₹10</button>
//                             <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1) ? false : true} onClick={() => { pay(2000) }}>Pay ₹20</button>
//                             <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1) ? false : true} onClick={() => { pay(3000) }}>Pay ₹30</button>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PaymentPage




"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'
import { searchuser } from '@/actions/useractions'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    const [query, setquery] = useState("")
    const [suggestions, setsuggestions] = useState([])
    const router = useRouter()

    const handleSearch = async (e) => {
        const val = e.target.value
        setquery(val)
        if (val.trim().length < 1) {
            setsuggestions([])
            return
        }
        const results = await searchuser(val)
        setsuggestions(results)
    }

    const handleSelect = (username) => {
        setquery("")
        setsuggestions([])
        router.push(`/${username}`)
    }

    return (
        <nav className='bg-black text-white flex justify-between items-center md:h-16 flex-col md:flex-row px-4'>

            <div className='logo font-bold text-lg flex justify-center items-center gap-2'>
                <Link href={'/'}><Image src="/favicon.png" alt="logo" width={35} height={35} /></Link>
                <Link href={'/'}><div><span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></div></Link>
            </div>

            {/* Search Bar */}
            <div className='relative'>
                <div className='flex items-center bg-blue-950 rounded-lg overflow-visible'>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Find a creator..."
                        className="bg-transparent text-white placeholder-slate-400 px-4 py-2 text-sm focus:outline-none w-48 md:w-64"
                    />
                    <span className='pr-3 text-slate-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                    </span>
                </div>

                {/* Dropdown suggestions */}
                {suggestions.length > 0 && (
                    <ul className='absolute top-11 left-0 w-full bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden'>
                        {suggestions.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => handleSelect(user.username)}
                                className='px-4 py-2 text-sm hover:bg-blue-700 cursor-pointer'
                            >
                                @{user.username}
                            </li>
                        ))}
                    </ul>
                )}

                {/* No results */}
                {query.trim().length > 0 && suggestions.length === 0 && (
                    <div className='absolute top-11 left-0 w-full bg-gray-800 rounded-lg shadow-lg z-50 px-4 py-2 text-sm text-slate-400'>
                        No creators found
                    </div>
                )}
            </div>

            <div className='relative flex flex-col gap-4 md:flex md:flex-row md:items-center'>
                {session && <>
                    <button
                        onClick={() => { setshowdropdown(!showdropdown) }}
                        onBlur={() => { setTimeout(() => { setshowdropdown(false) }, 100) }}
                        className="text-white bg-blue-700 hover:bg-blue-800 mx-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button">
                        Welcome {session.user.email}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div className={`z-10 ${showdropdown ? "" : "hidden"} absolute top-10 left-[165px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link onClick={() => { signOut() }} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>}

                {session && (
                    <button type="button"
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => { signOut() }}>
                        Logout
                    </button>
                )}

                {!session && (
                    <Link href={"/login"}>
                        <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Login
                        </button>
                    </Link>
                )}
            </div>

        </nav>
    )
}

export default Navbar