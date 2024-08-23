import {
  Doodle1,
  Doodle10,
  Doodle12,
  Doodle17,
  Doodle7,
} from "../SVGs/doodles";

const Feature1 = () => {
  return (
    <section className="bg-main isolate overflow-hidden">
      <article className="relative xl:container">
        <Doodle1 className="bottom-1/2 left-1/2 w-60" />
        <Doodle7 className="bottom-32 right-40 w-24" />
        <Doodle10 className="bottom-28 left-[35%] w-32" />
        <Doodle12 className="top-10 left-48 w-24" />
        <Doodle17 className="bottom-10 left-16 w-44" />
        <ul className="px-3 py-16 md:py-20 lg:py-24 container flex flex-col items-center gap-6 justify-evenly">
          <h2 className="text-white max-w-3xl text-center">
            boost your career with verified certifications and recognized
            expertise
          </h2>
          <img
            src="/feature-1.svg"
            alt="mockup"
            className="w-72 sm:w-80 md:w-96 lg:w-[32rem] xl:[42rem]"
          />
        </ul>
      </article>
    </section>
  );
};

export default Feature1;
