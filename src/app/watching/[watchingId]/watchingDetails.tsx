"use client";

import ItemContent from "@/components/main/itemContent";
import { lessonStore } from "@/store/lessonStoe";
import React, { useEffect } from "react";

interface WatchingDetailsProps {
  watchingId: string;
}

const WatchingDetails: React.FC<WatchingDetailsProps> = ({ watchingId }) => {
  const { lesson, loading, fetchLessonById } = lessonStore();

  useEffect(() => {
    fetchLessonById(watchingId);
  }, [watchingId, fetchLessonById]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {lesson && (
        <ItemContent
          img={lesson.img}
          videoSrc={lesson.src}
          title={lesson.title}
          description={lesson.description}
          source={lesson.source}
          pausedTime={lesson.pausedTime || 0}
          tags={lesson.tags}
          language={lesson.language}
          date={formatDate(lesson.created_at)}
        />
      )}
    </>
  );
};

export default WatchingDetails;
