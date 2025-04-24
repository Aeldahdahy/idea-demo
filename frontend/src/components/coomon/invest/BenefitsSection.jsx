import React from "react";

function BenefitsSection() {
  return (
    <section className="mt-64 w-full max-w-[1687px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[58%] max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0e2ef40b67c649e8c470d8e700d29d9848bb50d?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
            alt="Investment Platform Interface"
            className="object-contain grow w-full aspect-[1.15] rounded-[40px] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <article className="self-stretch my-auto text-4xl tracking-tighter text-center text-black leading-[86px] max-md:mt-10 max-md:max-w-full">
            <h2 style={{ fontWeight: 700, fontSize: "48px" }}>
              Find the best investment deals
            </h2>
            <p style={{ fontSize: "32px" }}>
              Access the largest network of entrepreneurs. Filter opportunities
              by country, location, industry, stage, investment range and
              language to find the deal for you.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
