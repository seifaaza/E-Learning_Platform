import Link from "next/link";
import React from "react";

export default function Lessons() {
  return (
    <section className="container px-3 py-12">
      <h1 className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold capitalize mb-2">
        engage with interactive video lessons
      </h1>
      <p className="text-base font-light text-gray-300">
        Discover engaging interactive video lessons for deep learning and
        real-time application.
      </p>
      <div className="mt-8 grid gap-x-6 gap-y-4 md:gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <Link href="/lessons/id">
          <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 rounded-lg overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
            <img
              src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              alt=""
              className="h-full w-full object-cover object-center opacity-80 group-hover:opacity-100 duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="mt-5 mb-2 text-xl font-bold text-white">
                Marketing
              </h3>
              <p className="text-white truncate">
                Plan it, create it, launch it. Collaborate seamlessly with all
                the organization and hit your marketing goals every month with
                our marketing plan.
              </p>
            </div>
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 512 512"
              className="absolute h-10 md:h-12 w-10 md:w-12 top-[42%] left-1/2 -translate-y-1/2 -translate-x-1/2"
            >
              <path
                d="M405.2 232.9 126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
