import {
  BsBookHalf,
  BsCurrencyExchange,
  BsClipboard2PulseFill,
} from "react-icons/bs";

const SocialProof = () => {
  const statsList = [
    {
      title: "learning",
      stat: "tracking",
      icon: <BsClipboard2PulseFill className="text-[1.9rem]" />,
    },
    {
      title: "interactive",
      stat: "courses & assessments",
      icon: <BsBookHalf className="text-[1.75rem]" />,
    },
    {
      title: "free",
      stat: "service cost",
      icon: <BsCurrencyExchange className="text-[1.9rem]" />,
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
    <section className="px-3 bg-gradient-to-b from-blue-600 from-50% to-50% to-blue-500">
      <article className="bg-blue-700 max-w-screen-lg mx-auto text-center py-14 lg:py-16 rounded-lg">
        <dl className="w-fit flex sm:flex-row flex-col gap-8 md:gap-16 xl:gap-32 mx-auto text-white ">
          {stats}
        </dl>
      </article>
    </section>
  );
};

export default SocialProof;
