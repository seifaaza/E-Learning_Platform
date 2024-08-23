import {
  BsBox,
  BsCardText,
  BsCollectionPlay,
  BsPatchQuestion,
} from "react-icons/bs";

// Define the interface for the props
interface CourseInfoFooterProps {
  totalLessons: number;
  totalArticles: number;
  totalTopics: number;
}

const CourseInfoFooter: React.FC<CourseInfoFooterProps> = ({
  totalLessons,
  totalArticles,
  totalTopics,
}) => {
  return (
    <>
      <h3 className="my-6 lg:!text-2xl text-center">This course includes</h3>
      <ul className="w-full sm:max-w-xl mx-auto flex flex-wrap gap-4 justify-between items-center">
        <li className="flex items-center gap-2 text-main">
          <BsCollectionPlay className="h-8" />
          <h5 className="capitalize font-medium">{totalLessons} lessons</h5>
        </li>
        <li className="flex items-center gap-2 text-main">
          <BsCardText className="h-8" />
          <h5 className="capitalize font-medium">{totalArticles} articles</h5>
        </li>
        <li className="flex items-center gap-2 text-main">
          <BsBox className="h-8" />
          <h5 className="capitalize font-medium">{totalTopics} topics</h5>
        </li>
        <li className="flex items-center gap-2 text-main">
          <BsPatchQuestion className="h-8" />
          <h5 className="capitalize font-medium">1 quiz</h5>
        </li>
      </ul>
    </>
  );
};

export default CourseInfoFooter;
