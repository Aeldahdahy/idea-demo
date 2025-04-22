"use client";
import React from "react";

function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="flex gap-2.5 items-center self-end px-5 py-4 mt-44 mr-9 min-h-[62px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[62px] max-md:mt-10 max-md:mr-2.5"
      aria-label="Scroll to top"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2eea0565481af2cb1df24eb0e680dcde96c1516?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
        alt="Up Arrow"
        className="object-contain self-stretch my-auto aspect-[0.87] w-[26px]"
      />
    </button>
  );
}

export default ScrollToTop;
