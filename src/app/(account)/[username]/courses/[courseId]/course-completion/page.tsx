import CompletedCourseModal from "./courseCompletedModal";

interface CourseCompletedProps {
  username: string;
  courseId: string;
}

const CourseCompleted: React.FC<CourseCompletedProps> = ({
  username,
  courseId,
}) => {
  return <CompletedCourseModal username={username} courseId={courseId} />;
};

export default CourseCompleted;
