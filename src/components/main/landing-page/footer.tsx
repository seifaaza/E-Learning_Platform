import { Logo } from "../SVGs/logos";
import Link from "next/link";
import { Doodle16 } from "../SVGs/doodles";

const Footer: React.FC = () => {
  const name = "Learnify";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 px-3 py-12 md:py-14 lg:py-16 relative isolate overflow-hidden">
      <Doodle16 className="rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-56 " />
      <article className="mx-auto max-w-2xl text-center">
        <Link href="/" className="flex justify-center items-center gap-2 mb-2">
          <Logo className="h-7 " />
          <span className="text-white text-3xl font-black">{name}</span>
        </Link>
        <p className="text-blue-100 my-5 text-center">
          E-learning platform offering a variety of features designed to enhance
          your learning experience.
        </p>
        <h6 className=" text-blue-200">
          © {currentYear} {name}™ . All Rights Reserved.
        </h6>
      </article>
    </footer>
  );
};

export default Footer;