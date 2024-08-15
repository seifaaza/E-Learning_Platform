import CourseInfo from "./courseInfo";

interface CourseItemProps {
  params: {
    courseId: string;
  };
}

const CourseItem: React.FC<CourseItemProps> = async ({
  params: { courseId },
}) => {
  return <CourseInfo courseId={courseId} />;
};

export default CourseItem;
