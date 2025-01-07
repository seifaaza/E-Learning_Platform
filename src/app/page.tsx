"use client";
import FAQ from "@/components/main/landing-page/faq";
import Feature1 from "@/components/main/landing-page/feature1";
import Feature2 from "@/components/main/landing-page/feature2";
import Feature3 from "@/components/main/landing-page/feature3";
import Footer from "@/components/main/landing-page/footer";
import Header from "@/components/main/landing-page/header";
import SocialProof from "@/components/main/landing-page/socialProof";
import Sponsors from "@/components/main/landing-page/sponsors";
import Testimonial from "@/components/main/landing-page/testimonial";
import Preloader from "@/components/main/loaders/preLoader";
import Navbar from "@/components/main/navbar/page";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Preloader /> // Show the preloader while loading
      ) : (
        <>
          <Navbar />
          <Header />
          <SocialProof />
          <Testimonial />
          <Sponsors />
          <Feature1 />
          <Feature2 />
          <Feature3 />
          <FAQ />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
