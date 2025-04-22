"use client";
import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import InvestmentOpportunities from "./InvestmentOpportunities";
import BenefitsSection from "./BenefitsSection";
import MobileAppSection from "./MobileAppSection";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import Copyright from "./Copyright";

function Invest() {
  return (
    <main className="flex overflow-hidden flex-col pt-9 bg-white">
      <div className="flex flex-col items-start pl-3.5 w-full max-md:max-w-full">
        <Header />
        <HeroSection />
        <InvestmentOpportunities />
        <BenefitsSection />
      </div>
      <MobileAppSection />
      <ScrollToTop />
      <Footer />
      <Copyright />
    </main>
  );
}

export default Invest;
