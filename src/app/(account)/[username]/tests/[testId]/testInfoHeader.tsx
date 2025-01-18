import React from "react";

// Define the props interface
interface TestInfoHeaderProps {
  testId: string;
  title: string;
  thumbnail: string;
  time: string;
  source: string;
  language: string;
  createdAt: string;
  firstQuestionId: string;
}

export default function TestInfoHeader({
  testId,
  title,
  thumbnail,
  time,
  source,
  language,
  createdAt,
  firstQuestionId,
}: TestInfoHeaderProps) {
  return (
    <div>
      <p>{testId}</p>
      <p>{title}</p>
      <p>{thumbnail}</p>
      <p>{time}</p>
      <p>{source}</p>
      <p>{language}</p>
      <p>{createdAt}</p>
      <p>{firstQuestionId}</p>
    </div>
  );
}
