import React from "react";

function InvestmentCard({
  bgColor,
  textColor,
  secondaryTextColor,
  badgeColor,
  className = "",
}) {
  return (
    <article
      className={`pt-1.5 pr-8 pb-5 pl-3.5 w-full ${bgColor} rounded-[40px] max-md:pr-5 max-md:max-w-full ${className}`}
    >
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-9/12 max-md:ml-0 max-md:w-full">
          <div
            className={`flex grow gap-3.5 text-xl leading-loose ${textColor} max-md:mt-10`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b45c590850af54ec1ea5a845137c9a2eda78b1d8?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Company Logo"
              className="object-contain shrink-0 self-start mt-3.5 w-20 aspect-[0.98] rounded-[30px]"
            />
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold leading-none">IDEA-Venture</h3>
              <p className={`self-start mt-3 ${secondaryTextColor}`}>
                Investment Start-up
              </p>
              <div className="flex flex-col items-start pr-11 pl-2 mt-3 text-black max-md:pr-5">
                <span className="z-10">Seed stage</span>
                <div
                  className={`flex shrink-0 w-28 rounded-3xl ${badgeColor} h-[23px]`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div
            className={`self-stretch my-auto ${secondaryTextColor} max-md:mt-10`}
          >
            <p className="text-xl leading-loose">EGP 15,000 </p>
            <p className="mt-3 text-xs leading-4 max-md:mr-1.5">
              Min per Investor
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default InvestmentCard;
