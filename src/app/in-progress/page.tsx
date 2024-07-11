import React from "react";
import VideoPlayer from "../lessons/[lessonId]/videoPlayer";

export default function InProgress() {
  return (
    <section className="container px-3 py-12">
      <h1 className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold capitalize mb-2">
        Resume learning at your convenience
      </h1>
      <p className="text-base font-light text-gray-300">
        Access videos you&apos;ve started watching but haven&apos;t completed.
      </p>
      <div className="mt-8 grid gap-x-6 gap-y-4 md:gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 rounded-lg overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            alt=""
            className="h-full w-full object-cover object-center opacity-60 group-hover:opacity-100 duration-700"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="mt-5 mb-2 text-xl font-bold text-white">
              Marketing
            </h3>
            <p className="text-white truncate">
              Plan it, create it, launch it. Collaborate seamlessly with all the
              organization and hit your marketing goals every month with our
              marketing plan.
            </p>
          </div>
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 512 512"
            className="absolute w-10 md:w-12 top-[35%] md:top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <path
              d="M224 435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.8 0 12.2-5.4 12.2-12.2zM371.8 64h-71.6c-6.7 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.7 0 12.2-5.4 12.2-12.2V76.1c0-6.7-5.4-12.1-12.2-12.1z"
              fill="#ffffff"
            ></path>
          </svg>
          <span className="absolute bottom-0 left-0 w-full h-[0.2rem] bg-gray-500"></span>
          <span className="absolute bottom-0 left-0 w-1/4 h-[0.2rem] bg-white"></span>
        </div>
      </div>
    </section>
  );
}
