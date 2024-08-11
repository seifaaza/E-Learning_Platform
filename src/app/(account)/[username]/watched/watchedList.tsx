// import Link from "next/link";
// import axios from "axios";
// import Card from "@/components/main/card/page";
// import DataEmpty from "@/components/main/errors/dataEmpty";

// // Define the watched interface
// interface Watched {
//   id: string;
//   img: string;
//   title: string;
//   description: string;
//   pausedAt: number;
//   action: string;
// }

// interface WatchedListProps {
//   watched?: Watched[];
//   username: string;
// }

// const WatchedList: React.FC<WatchedListProps> = async ({ username }) => {
//   let watched: Watched[] = [];

//   try {
//     const response = await axios.get(`/api/watched/getWatchedList/${username}`);
//     watched = response.data;
//   } catch (error) {
//     console.error("Error fetching watched:", error);
//   }

//   return (
//     <>
//       {watched.length > 0 ? (
//         <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
//           {watched.map((item: Watched) => (
//             <Link href={`/courses/${item.id}`} key={item.id}>
//               <Card
//                 img={`https://res.cloudinary.com/depztpide/image/upload/${item.img}`}
//                 title={item.title}
//                 description={item.description}
//                 pausedAt={item.pausedAt}
//                 isPaused
//               />
//             </Link>
//           ))}
//         </ul>
//       ) : (
//         <DataEmpty
//           imgSrc="/no-watched.svg"
//           text="Your watched list is empty. Watch some courses to get started!"
//         />
//       )}
//     </>
//   );
// };

// export default WatchedList;
