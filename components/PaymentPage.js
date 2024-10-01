"use client"
import React from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { initiate } from '@/actions/useractions'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { fetchuser } from '@/actions/useractions'
import { fetchpayments } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    //const { data: session } = useSession()

    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(()=>{
        if(searchParams.get("paymentdone") == "true"){
        toast.success('Thanks for the donation!', {
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
        router.push(`/${username}`)
    }, [])

    const getData = async (params) => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // Get the order Id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "BeyondDualism", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='relative'>
                <Image className='object-cover shadow-blue-700 shadow-2xl' width={1600} height={400} src={currentUser.coverpic} alt="cover" />
                <div className='absolute -bottom-12 right-[35%] md:right-[46%] rounded-full border-2 border-white overflow-hidden'>
                    <Image className='object-cover' width={128} height={128} src={currentUser.profilepic} alt="profile" />
                </div>
            </div>
            <div className='info flex flex-col items-center justify-center gap-2 py-20'>

                <div className="font-bold text-xl">
                    <span>@{username}</span>
                </div>
                <div className='text-slate-400'>
                    <span>Let&apos;s help {username} in his mission!</span>
                </div>
                <div className='text-slate-400'>
                    <span>{Payments.length} Payments • ₹{Payments.reduce((a,b) => a + (b.amount)/100, 0)} raised</span>
                </div>

                <div className="payment flex flex-col md:flex-row gap-3 w-[80%] pt-6">
                    <div className="supporters w-full md:w-1/2 bg-blue-950 text-white p-10 rounded-lg">
                        <h2 className='text-2xl text-center md:text-left font-bold mb-2'>Top 10 Supporters</h2>
                        <ul className='text-xs md:text-base'>
                            {Payments.length == 0 && <li className='pt-4'>No payments yet!</li>}
                            {Payments.map((p, i) => {
                                return (
                                    <li key={i} className='pt-4 flex gap-2 items-center'>
                                        <Image width={30} height={30} src="/fans.png" alt="fan" />
                                        <span>
                                            <span>{p.name} donated</span>
                                            <span className='font-bold px-2 text-green-500'>₹{(p.amount) / 100}</span>
                                            <span>with a message</span>
                                            <span className='font-semibold px-2 text-green-500'>&quot;{p.message}&quot;</span>
                                        </span>
                                    </li>
                                )
                            })}

                            {/* <li className='pt-4 flex gap-2 items-center'>
                                <Image width={30} src="/user.gif" alt="user" />
                                <span>
                                    <span>Divyansh donated</span>
                                    <span className='font-bold px-2 text-green-500'>$30</span>
                                    <span>with a message</span>
                                    <span className='font-semibold px-2 text-green-500'>"Lots of &hearts;"</span>
                                </span>
                            </li>
                            <li className='pt-4 flex gap-2 items-center'>
                                <Image width={30} src="/user.gif" alt="user" />
                                <span>
                                    <span>Divyansh donated</span>
                                    <span className='font-bold px-2 text-green-500'>$30</span>
                                    <span>with a message</span>
                                    <span className='font-semibold px-2 text-green-500'>"Lots of &hearts;"</span>
                                </span>
                            </li> */}

                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 bg-blue-950 text-white p-10 rounded-lg">
                        <h2 className='text-2xl text-center md:text-left font-bold mb-6'>Make a payment</h2>
                        <div className="flex flex-col gap-2">
                            <input onChange={handleChange} value={paymentform.name} className='w-full rounded-lg p-3 bg-blue-900' type="text" placeholder='Enter Name' name="name" id="" />
                            <input onChange={handleChange} value={paymentform.message} className='w-full rounded-lg p-3 bg-blue-900' type="text" placeholder='Enter Message' name="message" id="" />
                            <input onChange={handleChange} value={paymentform.amount} className='w-full rounded-lg p-3 bg-blue-900' type="number" min="10" max="500000" placeholder='Enter Amount' name="amount" id="" />
                            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1 && paymentform.amount?.length > 1) ? false : true} onClick={() => { pay((paymentform.amount) * 100) }}>Pay</button>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1) ? false : true} onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1) ? false : true} onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={(paymentform.name?.length > 1) ? false : true} onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage