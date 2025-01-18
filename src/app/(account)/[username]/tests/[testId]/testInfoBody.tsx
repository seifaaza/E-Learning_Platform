import React from "react";

// Define the props interface
interface TestInfoBodyProps {
  objectives: string[];
  topics: string[];
  description: string;
  passingScore: number;
}

export default function TestInfoBody({
  objectives,
  topics,
  description,
  passingScore,
}: TestInfoBodyProps) {
  return (
    <div>
      <p>{objectives.join(", ")}</p>
      <p>{topics.join(", ")}</p>
      <p>{description}</p>
      <p>{passingScore}</p>
    </div>
  );
}
