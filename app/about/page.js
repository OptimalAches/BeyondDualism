import React from 'react'
import Link from 'next/link'

const about = () => {
    return (
        <div className="bg-[#1a1a1a] bg-opacity-80 rounded-lg p-8 max-w-3xl mx-4 md:mx-auto shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">About <span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></h1>
            <p className="leading-relaxed text-lg mb-6">
                Welcome to <span className="font-semibold"><span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></span>, a platform designed for those who recognize the need to
                shift the world's underlying philosophy. Our mission is to empower creators, activists, and thinkers who are dedicated to
                advancing the principles of <span className="font-semibold">Non-Dualism (Advaita Vedanta)</span> to address some of the most pressing global issues,
                including climate change and income inequality.
            </p>
            <p className="leading-relaxed text-lg mb-6">
                On <span className="font-semibold"><span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></span>, you can create a profile, share your work, and connect with supporters who
                believe in your mission. Our platform allows you to raise funds directly from your audience, giving you the freedom to focus
                on making a meaningful impact.
            </p>
            <p className="leading-relaxed text-lg mb-6">
                We believe that by supporting individuals and groups who are working to transcend dualistic thinking, we can create a more
                harmonious and sustainable world. Join us on this journey and be a part of the change.
            </p>
            <p className="text-center">
                <Link href="/login" className="inline-block bg-[#63e] hover:bg-[#4a2da6] text-white font-semibold py-3 px-6 rounded transition-all duration-300">
                    Join Today
                </Link>
            </p>
        </div>
    )
}

export default about

export const metadata = {
    title: 'About - BeyondDualism!',
}