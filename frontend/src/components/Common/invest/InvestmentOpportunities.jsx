import React from "react";
import InvestmentCard from "./InvestmentCard";
import SocialLinks from "./SocialLinks";

function InvestmentOpportunities() {
  return (
    <section className="self-end px-1.5 mt-5 max-w-full w-[1681px] max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex z-10 flex-col items-start mt-9 w-full max-md:mt-10 max-md:max-w-full">
            <p className="self-stretch text-4xl tracking-tighter text-black leading-[86px] max-md:max-w-full">
              <strong>Browse</strong> hundreds of investment opportunities,
              connect with entrepreneurs and manage your investment contacts
              with the world's Entrepreneur network.
            </p>
            <h2 className="mt-16 ml-2.5 text-xl font-bold text-black max-md:mt-10">
              Follow Us
            </h2>
            <SocialLinks />
          </div>
        </div>
        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col items-center self-stretch px-20 pt-32 pb-96 my-auto rounded-none min-h-[806px] max-md:px-5 max-md:py-24 max-md:-mt-20 max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d11bd8b663851db6a3d75e21352ea0c8fbee94df?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Background Pattern"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="relative max-w-full w-[526px]">
              <InvestmentCard
                bgColor="bg-blue-900"
                textColor="text-white"
                secondaryTextColor="text-white"
                badgeColor="bg-zinc-100 bg-opacity-90"
              />
              <InvestmentCard
                bgColor="bg-blue-100"
                textColor="text-black"
                secondaryTextColor="text-zinc-800"
                badgeColor="bg-stone-300 bg-opacity-90"
                className="mt-16 max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvestmentOpportunities;
