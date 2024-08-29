"use client";

import { Separator } from "@radix-ui/react-separator";
import CourseRating from "./courseRating";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CourseCompletedData from "./courseCompletedData";
import { mainStore } from "@/store/mainStore";

interface CompletedCourseProps {
  username: string;
  courseId: string;
}

const CourseCompletedModal: React.FC<CompletedCourseProps> = ({
  username,
  courseId,
}) => {
  const { isDialogOpen } = mainStore();
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="bg-blue-50 w-[calc(100%-4rem)] sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl border-none rounded-lg">
        <article className="mt-2 lg:p-2">
          <CourseCompletedData username={username} courseId={courseId} />
          <Separator
            orientation="vertical"
            className="h-[1px] w-2/3 md:w-1/2 mx-auto bg-gray-800 opacity-20 my-6 md:my-8 xl:my-10"
          />
          <CourseRating username={username} courseId={courseId} />
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCompletedModal;
