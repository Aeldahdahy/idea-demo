"use client";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import InvestorCard from "./InvestorCard";
import InvestorRequest from "./InvestorRequest";
import FindInvestor from "./FindInvestor";
import AppDownload from "./AppDownload";
import Footer from "./Footer";

export default function InputDesign() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&family=Signika:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <main className="relative mx-auto w-full max-w-none bg-white max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Header />
        <section className="px-20 py-10 max-md:p-5 max-sm:p-2.5">
          <Hero />
          <InvestorCard />
          <InvestorRequest />
          <FindInvestor />
        </section>
        <AppDownload />
        <Footer />
      </main>
    </>
  );
}
