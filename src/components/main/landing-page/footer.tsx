import { Logo } from "../SVGs/logos";
import Link from "next/link";
import { Doodle16 } from "../SVGs/doodles";

const Footer: React.FC = () => {
  const name = "Learnify";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 px-3 py-12 md:py-14 lg:py-16 relative isolate overflow-hidden">
      <Doodle16 className="rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-60 " />
      <ul className="mx-auto max-w-2xl text-center">
        <Link href="/" className="flex justify-center items-center gap-2">
          <Logo className="h-6 !fill-blue-700" />
          <span className="text-2xl font-black capitalize text-blue-700 italic">
            {name}
          </span>
        </Link>
        <p className="my-6 text-blue-100">
          E-learning platform offering a variety of features designed to enhance
          your learning experience.
        </p>
        <li className="text-sm text-blue-200">
          © {currentYear}{" "}
          <a href="#" className="hover:underline capitalize">
            {name}™
          </a>
          . All Rights Reserved.
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
