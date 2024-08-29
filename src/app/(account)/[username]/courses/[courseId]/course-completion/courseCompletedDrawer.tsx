"use client";

import { Separator } from "@radix-ui/react-separator";
import CourseRating from "./courseRating";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CourseCompletedData from "./courseCompletedData";
import { mainStore } from "@/store/mainStore";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface CourseCompletedDrawerProps {
  username: string;
  courseId: string;
}

const CourseCompletedDrawer: React.FC<CourseCompletedDrawerProps> = ({
  username,
  courseId,
}) => {
  const { isDialogOpen } = mainStore();
  return (
    <Drawer open={isDialogOpen}>
      <DrawerContent className="bg-blue-50 border-none rounded-t-lg">
        <article className="container mb-2 md:mb-4 lg:mb-6 xl:mb-8">
          <CourseCompletedData username={username} courseId={courseId} />
          <Separator
            orientation="vertical"
            className="h-[1px] w-2/3 md:w-1/2 mx-auto bg-gray-800 opacity-20 my-4 md:my-6 xl:my-8"
          />
          <CourseRating username={username} courseId={courseId} />
        </article>
      </DrawerContent>
    </Drawer>
  );
};

export default CourseCompletedDrawer;
