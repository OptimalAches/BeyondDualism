import React from 'react'

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-black text-white flex justify-center items-center h-16 px-8 py-8'>
      <span className='text-center font-semibold'>Copyright &copy; {currentYear} <span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span> - All rights reserved</span>
    </footer>
  )
}

export default Footer