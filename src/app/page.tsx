"use client";
import FAQ from "@/components/main/landing-page/faq";
import Features1 from "@/components/main/landing-page/features1";
import Features2 from "@/components/main/landing-page/features2";
import Footer from "@/components/main/landing-page/footer";
import Header from "@/components/main/landing-page/header";
import SocialProof from "@/components/main/landing-page/socialProof";
import Sponsors from "@/components/main/landing-page/sponsors";
import Testimonial from "@/components/main/landing-page/testimonial";
import Navbar from "@/components/main/navbar/page";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Header />
      <SocialProof />
      <Testimonial />
      <Sponsors />
      <Features1 />
      <Features2 />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
