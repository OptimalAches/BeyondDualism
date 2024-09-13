import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="gif flex flex-col gap-3 justify-center items-center text-white h-[44vh] px-5 md:px-0">
        <div className="font-bold text-4xl md:text-5xl flex justify-center items-center gap-2">
          <div><span>Beyond</span><span className="text-[#63e]">Dualism</span><span>!</span></div>
          <img width={50} src="/favicon.png" alt="logo" />
        </div>
        <span className="text-center font-bold text-sm md:text-base">A crowdfunding platform for explorers of AdvaitVedanta or Non-dualism</span>
        <div className="text-center text-sm md:text-base font-semibold mt-8">Get funded by individuals who understands the importance of changing the world&apos;s underlying Philosophy</div>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here!</button>
          </Link>

          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More!</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-20"></div>

      <div className="container mx-auto text-white py-12 px-5 md:px-0">
        <h2 className="text-2xl font-bold text-center mb-12">Get the companionship that liberates</h2>
        <div className="flex justify-around gap-5">
          <div className="flex flex-col justify-center items-center gap-3">
            <img src="/help.png" alt="help" width={88} />
            <span className="font-bold text-center text-base md:text-lg">People want to help</span>
            <span className="font-semibold text-center text-xs md:text-sm">Your fans are available to support you</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src="/contribute.png" alt="contribute" width={88} />
            <span className="font-bold text-center text-base md:text-lg">People want to contribute</span>
            <span className="font-semibold text-center text-xs md:text-sm">Your fans are willing to contribute financially</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src="/collaborate.png" alt="collaborate" width={88} />
            <span className="font-bold text-center text-base md:text-lg">People want to collaborate</span>
            <span className="font-semibold text-center text-xs md:text-sm">Your fans are ready to collaborate with you</span>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-20"></div>

      <div className="container mx-auto text-white py-12 flex flex-col items-center justify-center gap-8">
        
        <h2 className="text-2xl font-bold">Learn more about us</h2>

        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/UsmGmVgJaVw?si=akGnOe7-hBPhL6yD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>

      </div>
    </>
  );
}
