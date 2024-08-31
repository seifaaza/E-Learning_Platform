"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsArrowRight, BsCheck2 } from "react-icons/bs";
import CompletedCourseLoader from "@/components/main/loaders/completedCourseLoader";
import { useToast } from "@/components/ui/use-toast";

interface CourseCompletedDataProps {
  username: string;
  courseId: string;
}

const CourseCompletedData: React.FC<CourseCompletedDataProps> = ({
  username,
  courseId,
}) => {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-course?courseId=${courseId}`
        );
        setCourse(response.data);
      } catch (error: any) {
        toast({
          title: "Server Error",
          description:
            "An error occurred on the server. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [username, courseId, router]);

  if (loading) {
    return <CompletedCourseLoader />;
  }

  return (
    <ul className="w-full mt-4 mb-2 flex flex-col justify-center items-center sm:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
      <li className="h-fit w-full sm:w-1/2 xl:w-1/3 flex flex-col">
        <img
          src={`https://res.cloudinary.com/depztpide/image/upload/${course.thumbnail}`}
          alt={`${course.title} poster`}
          className="aspect-video object-cover rounded-lg border-[1px] !border-main/20"
        />
      </li>
      <li className="flex flex-col gap-1 w-full sm:w-1/2 ">
        <section className="w-full mb-4">
          <p className="text-sm font-medium text-main mb-2 text-right">
            100% complete
          </p>
          <Progress value={100} className="w-full h-[.2rem] bg-main/20" />
        </section>
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-main capitalize mb-1">
          Congratulations, {username}! 🎉
        </h2>
        <h4 className="text-gray-900 font-medium normal-case !leading-normal">
          You’ve successfully completed the {course.title} course!
        </h4>
        <h6 className="text-gray-700 max-w-xl mt-1">
          Keep up the great work, and continue to reach for new heights!
        </h6>

        <ul className="flex gap-2 md:gap-4 mt-3 xl:mt-5">
          <Link href="/courses">
            <Button className="hover:!bg-main brightness-90">
              Done
              <BsCheck2 className="ml-2 h-4" />
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              variant="link"
              className="hover:!no-underline !border-[1px] !border-main hover:!bg-main hover:!text-white"
            >
              Similar Courses
              <BsArrowRight className="ml-2 h-4" />
            </Button>
          </Link>
        </ul>
      </li>
    </ul>
  );
};

export default CourseCompletedData;
