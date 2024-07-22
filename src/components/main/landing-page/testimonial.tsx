import { BsPersonCircle } from "react-icons/bs";
import { Doodle18, Doodle5 } from "../SVGs/doodles";

const Testimonial = () => {
  return (
    <section className="bg-blue-500 ">
      <ul className="px-3 py-16 md:py-20 lg:py-24 max-w-screen-xl mx-auto text-center relative isolate overflow-hidden">
        <Doodle18 className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-full md:w-3/4 lg:w-[43%] !fill-blue-600/30" />
        <Doodle5 className="bottom-12 left-10 md:left-24 lg:left-64 xl:left-96 w-28 !fill-blue-600/30" />

        <figure className="max-w-screen-md mx-auto">
          <svg
            className="h-20 mx-auto text-blue-600 "
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-xl font-medium text-white">
              &quot;I love Learnify! The ability to watch and save video
              lessons, then pick up where I left off anytime, is fantastic.
              Plus, it&apos;s all free! It&apos;s perfect for flexible learning
              at my own pace.&quot;
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 gap-3">
            <BsPersonCircle className="text-lg text-white mb-1" />
            <h3 className="text-sm font-medium text-blue-100 capitalize">
              aaza seifeddine
            </h3>
            {/* <span className=" h-6 w-[1px] bg-blue-300"></span> */}
            <h4 className=" text-sm text-blue-100 capitalize">
              software engineer
            </h4>
          </figcaption>
        </figure>
      </ul>
    </section>
  );
};

export default Testimonial;
