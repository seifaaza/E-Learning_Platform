import Link from "next/link";
import axios from "axios";
import Card from "@/components/main/card/page";
import DataEmpty from "@/components/main/errors/dataEmpty";

// Define the Saved interface
interface Saved {
  id: string;
  img: string;
  title: string;
  description: string;
  pausedAt: number;
  action: string;
}

interface SavedListProps {
  saved?: Saved[];
  username: string;
}

const SavedList: React.FC<SavedListProps> = async ({ username }) => {
  let saved: Saved[] = [];
  saved;

  try {
    const response = await axios.get(`/api/saved/getSavedList/${username}`);
    saved = response.data;
  } catch (error) {
    console.error("Error fetching saved list:", error);
  }

  return (
    <>
      {saved.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {saved.map((item: Saved) => (
            <Link href={`/courses/${item.id}`} key={item.id}>
              <Card
                img={`https://res.cloudinary.com/depztpide/image/upload/${item.img}`}
                title={item.title}
                description={item.description}
                pausedAt={item.pausedAt}
                isPaused
              />
            </Link>
          ))}
        </ul>
      ) : (
        <DataEmpty
          imgSrc="/no-saved.svg"
          text="Your saved list is empty. Browse our courses and save your favorites to get started!"
        />
      )}
    </>
  );
};

export default SavedList;
