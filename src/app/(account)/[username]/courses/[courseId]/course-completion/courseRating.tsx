"use client";

import React, { useState, useEffect } from "react";
import { CommentRatings } from "@/components/main/rating";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BsFillSendFill, BsCheck2 } from "react-icons/bs";
import axios from "axios";
import CourseRatingLoader from "@/components/main/loaders/courseRatingLoader";
import { useToast } from "@/components/ui/use-toast";

interface CourseRatingProps {
  username: string;
  courseId: string;
}

const CourseRating: React.FC<CourseRatingProps> = ({ username, courseId }) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Handle rating submission
  const handleRatingCourse = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/rating?courseId=${courseId}`,
        { ratingValue }
      );
      setIsSubmitted(true); // Mark as submitted successfully
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast({
          title: "Rating Failed",
          description: "Failed to submit rating",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Server Error",
          description:
            "An error occurred on the server. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ul className="w-fit mx-auto flex flex-col items-center text-center">
      <h3 className="text-gray-900 font-medium mb-2 max-w-xl normal-case">
        How would you rate the course?
      </h3>
      <h6 className="text-gray-700 max-w-xl mb-4 xl:mb-6 normal-case">
        We value your feedback!
      </h6>
      <CommentRatings
        rating={ratingValue}
        size={36}
        interactive={!isSubmitted}
        onRatingChange={setRatingValue} // Update the ratingValue when the user changes it
      />
      <Button
        onClick={handleRatingCourse}
        disabled={loading || isSubmitted || ratingValue === 0}
        variant="link"
        className="hover:!no-underline !border-[1px] !border-main hover:!bg-main hover:!text-white mt-4"
      >
        {isSubmitted ? (
          <>
            Sent
            <BsCheck2 className="ml-2 h-4" />
          </>
        ) : loading ? (
          <>
            Submitting...
            <Loader2 className="ml-2 h-4 animate-spin" />
          </>
        ) : (
          <>
            Submit
            <BsFillSendFill className="ml-2 h-4" />
          </>
        )}
      </Button>
    </ul>
  );
};

export default CourseRating;
