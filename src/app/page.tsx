"use client";
import FAQ from "@/components/main/landing-page/faq";
import Features1 from "@/components/main/landing-page/features1";
import Features2 from "@/components/main/landing-page/features2";
import Footer from "@/components/main/landing-page/footer";
import Header from "@/components/main/landing-page/header";
import SocialProof from "@/components/main/landing-page/socialProof";
import Testimonial from "@/components/main/landing-page/testimonial";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <SocialProof />
      <Testimonial />
      <Features1 />
      <Features2 />
      <FAQ />
    </>
  );
};

export default Home;
