"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="1.5px"
        color="white"
        startPosition={0.2}
        stopDelay={200}
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default Providers;
