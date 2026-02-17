// "use client"
// import React, { useState, useRef, useEffect } from 'react'
// import { useSession, signOut } from "next-auth/react"
// import Link from 'next/link'
// import Image from 'next/image'
// import { searchuser } from '@/actions/useractions'
// import { useRouter } from 'next/navigation'

// const Navbar = () => {
//     const { data: session } = useSession()
//     const [showdropdown, setshowdropdown] = useState(false)
//     const [query, setquery] = useState("")
//     const [suggestions, setsuggestions] = useState([])
//     const router = useRouter()
//     const searchRef = useRef(null)

//     // ✅ Close search suggestions on outside click
//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (searchRef.current && !searchRef.current.contains(e.target)) {
//                 setsuggestions([])
//                 setquery("")
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside)
//         return () => document.removeEventListener("mousedown", handleClickOutside)
//     }, [])

//     const handleSearch = async (e) => {
//         const val = e.target.value
//         setquery(val)
//         if (val.trim().length < 1) {
//             setsuggestions([])
//             return
//         }
//         const results = await searchuser(val)
//         setsuggestions(results)
//     }

//     const handleSelect = (username) => {
//         setquery("")
//         setsuggestions([])
//         router.push(`/${username}`)
//     }

//     return (
//         <nav className='bg-black text-white flex justify-between items-center md:h-16 flex-col md:flex-row px-4'>

//             {/* Logo */}
//             <div className='logo font-bold text-lg flex justify-center items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer'>
//                 <Link href={'/'}><Image src="/favicon.png" alt="logo" width={35} height={35} /></Link>
//                 <Link href={'/'}><div><span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></div></Link>
//             </div>

//             {/* Search Bar - with ref for outside click */}
//             <div className='relative' ref={searchRef}>
//                 <div className='flex items-center bg-blue-950 rounded-lg hover:bg-blue-900 hover:ring-2 hover:ring-purple-500 transition-all duration-200'>
//                     <input
//                         type="text"
//                         value={query}
//                         onChange={handleSearch}
//                         placeholder="Find a creator..."
//                         className="bg-transparent text-white placeholder-slate-400 px-4 py-2 text-sm focus:outline-none w-48 md:w-64"
//                     />
//                     <span className='pr-3 text-slate-400'>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
//                         </svg>
//                     </span>
//                 </div>

//                 {suggestions.length > 0 && (
//                     <ul className='absolute top-11 left-0 w-full bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden'>
//                         {suggestions.map((user) => (
//                             <li
//                                 key={user._id}
//                                 onClick={() => handleSelect(user.username)}
//                                 className='px-4 py-2 text-sm hover:bg-blue-700 cursor-pointer'
//                             >
//                                 @{user.username}
//                             </li>
//                         ))}
//                     </ul>
//                 )}

//                 {query.trim().length > 0 && suggestions.length === 0 && (
//                     <div className='absolute top-11 left-0 w-full bg-gray-800 rounded-lg shadow-lg z-50 px-4 py-2 text-sm text-slate-400'>
//                         No creators found
//                     </div>
//                 )}
//             </div>

//             {/* Right side - identical to your original */}
//             <div className='relative flex flex-col gap-4 md:block'>
//                 {session && <>
//                     <button
//                         onClick={() => { setshowdropdown(!showdropdown) }}
//                         onBlur={() => { setTimeout(() => { setshowdropdown(false) }, 100) }}
//                         id="dropdownDefaultButton"
//                         className="text-white bg-blue-950 hover:bg-blue-900 hover:ring-2 hover:ring-purple-500 mx-4 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-200 shadow-lg"
//                         type="button">
//                         Welcome {session.user.email}
//                         <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
//                         </svg>
//                     </button>

//                     <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute top-12 left-[165px] bg-gradient-to-br from-blue-950 to-purple-900 divide-y divide-purple-700 rounded-lg shadow-xl w-44 border border-purple-600`}>
//                         <ul className="py-2 text-sm text-white">
//                             <li>
//                                 <Link href="/dashboard" className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md mx-2">Dashboard</Link>
//                             </li>
//                             <li>
//                                 <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md mx-2">Your Page</Link>
//                             </li>
//                             <li>
//                                 <Link onClick={() => { signOut() }} href="#" className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md mx-2">Sign out</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </>}

//                 {/* {session && (
//                     <button type="button"
//                         className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                         onClick={() => { signOut() }}>
//                         Logout
//                     </button>
//                 )} */}

//                 {!session && (
//                     <Link href={"/login"}>
//                         <button type="button" className="text-white bg-blue-950 hover:bg-blue-900 hover:ring-2 hover:ring-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-200 shadow-lg">
//                             Log in
//                         </button>
//                     </Link>
//                 )}
//             </div>

//         </nav>
//     )
// }

// export default Navbar


"use client"
import React, { useState, useRef, useEffect } from 'react'
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
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setsuggestions([])
                setquery("")
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

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

            {/* Logo */}
            <div className='logo font-bold text-lg flex justify-center items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer'>
                <Link href={'/'}><Image src="/favicon.png" alt="logo" width={35} height={35} /></Link>
                <Link href={'/'}><div><span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></div></Link>
            </div>

            {/* Right side - Search Bar + Buttons */}
            <div className='relative flex flex-col md:flex-row gap-4 md:gap-2 items-center'>
                
                {/* Search Bar */}
                <div className='relative' ref={searchRef}>
                    <div className='flex items-center bg-blue-950 rounded-lg hover:bg-blue-900 hover:ring-2 hover:ring-purple-500 transition-all duration-200'>
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

                {/* Welcome button + dropdown (when logged in) */}
                {session && <>
                    <button
                        onClick={() => { setshowdropdown(!showdropdown) }}
                        onBlur={() => { setTimeout(() => { setshowdropdown(false) }, 100) }}
                        id="dropdownDefaultButton"
                        className="text-white bg-blue-950 hover:bg-blue-900 hover:ring-2 hover:ring-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-200 shadow-lg"
                        type="button">
                        Welcome {session.user.email}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute top-12 right-0 bg-gradient-to-br from-blue-950 to-purple-900 divide-y divide-purple-700 rounded-lg shadow-xl w-44 border border-purple-600`}>
                        <ul className="py-2 text-sm text-white">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md mx-2">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md mx-2">Your Page</Link>
                            </li>
                            <li>
                                <Link onClick={() => { signOut() }} href="#" className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md mx-2">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>}

                {/* Login button (when not logged in) */}
                {!session && (
                    <Link href={"/login"}>
                        <button type="button" className="text-white bg-blue-950 hover:bg-blue-900 hover:ring-2 hover:ring-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200 shadow-lg">
                            Log in
                        </button>
                    </Link>
                )}
            </div>

        </nav>
    )
}

export default Navbar