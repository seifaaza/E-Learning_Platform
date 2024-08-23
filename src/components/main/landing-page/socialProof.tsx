import { BsBookHalf, BsAwardFill, BsClipboard2PulseFill } from "react-icons/bs";

const SocialProof = () => {
  const statsList = [
    {
      title: "learning",
      stat: "tracking",
      icon: <BsClipboard2PulseFill className="text-[1.9rem]" />,
    },
    {
      title: "interactive",
      stat: "courses & tests",
      icon: <BsBookHalf className="text-[1.75rem]" />,
    },
    {
      title: "certificates",
      stat: "earned",
      icon: <BsAwardFill className="text-[1.9rem]" />,
    },
  ];

  const stats = statsList.map((item, index) => (
    <ul key={index} className="flex items-center gap-5">
      {item.icon}
      <li className="text-left">
        <dt className="text-white mb-1 text-2xl font-bold capitalize">
          {item.title}
        </dt>
        <dd className="text-blue-50 text-base md:text-lg font-medium  capitalize">
          {item.stat}
        </dd>
      </li>
    </ul>
  ));

  return (
    <section className="px-3 bg-least">
      <article className="max-w-screen-lg mx-auto text-center py-14 lg:py-16 rounded-lg">
        <dl className="w-fit flex sm:flex-row flex-col gap-8 md:gap-16 xl:gap-32 mx-auto text-white ">
          {stats}
        </dl>
      </article>
    </section>
  );
};

export default SocialProof;
