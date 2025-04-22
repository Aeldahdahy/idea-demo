import React from "react";
import SocialLinks from "./SocialLinks";

function Footer() {
  return (
    <footer className="px-20 py-14 mt-16 w-full bg-blue-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[21%] max-md:ml-0 max-md:w-full">
          <div className="text-3xl font-light text-white whitespace-nowrap max-md:mt-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6497a9607e924869e5c05d9db19cf462ca305ce6?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Company Logo"
              className="object-contain aspect-[3.15] w-[300px]"
            />
            <nav className="flex flex-col items-center px-16 mt-12 w-full max-md:px-5 max-md:mt-10">
              <h2 className="text-4xl font-semibold text-center">Navigation</h2>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc8278037484f7488908c2784555bd185a9d9dd4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="Divider"
                className="object-contain mt-2.5 max-w-full aspect-[71.43] w-[147px]"
              />
              <a href="#" className="mt-14 text-center max-md:mt-10">
                Home
              </a>
              <div className="flex gap-4 mt-8 max-w-full text-center w-[105px]">
                <a href="#">Invest</a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdf5fe0fa70003f5860d20f6671c7f029b099d5e?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  alt="Arrow"
                  className="object-contain shrink-0 my-auto aspect-[1.8] w-[18px]"
                />
              </div>
              <div className="flex gap-6 self-end mt-8 text-center">
                <a href="#" className="basis-auto">
                  Fundraise
                </a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdf5fe0fa70003f5860d20f6671c7f029b099d5e?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  alt="Arrow"
                  className="object-contain shrink-0 self-start mt-3 aspect-[1.8] w-[18px]"
                />
              </div>
              <a href="#" className="mt-8">
                Blogs
              </a>
              <a href="#" className="mt-6 text-center">
                About-Us
              </a>
              <a href="#" className="mt-8 text-center">
                Contact-Us
              </a>
            </nav>
          </div>
        </div>
        <div className="ml-5 w-[79%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-wrap gap-5 justify-between items-start mt-36 max-md:mt-10 max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5229e2e7be26a786a2e1c5313244989bc3bd239?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Divider"
              className="object-contain shrink-0 mt-3.5 w-0.5 aspect-[0]"
            />
            <div className="flex flex-col items-center text-center max-md:max-w-full">
              <h2 className="text-4xl font-semibold text-white">
                Our Newsletter
              </h2>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dc9414155ae63de77d095f9b718c36cc7d95bfa?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="Divider"
                className="object-contain mt-4 max-w-full aspect-[83.33] w-[172px]"
              />
              <h3 className="mt-16 text-4xl font-semibold text-white max-md:mt-10 max-md:max-w-full">
                Subscribe to our newsletter
              </h3>
              <p className="mt-5 text-xl font-light text-white">
                Don't miss out! Be the first to know about exciting new
                developments.
              </p>
              <form className="flex flex-wrap gap-4 self-stretch mt-7">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="grow shrink-0 px-16 py-5 text-3xl font-light text-black bg-white border border-white border-solid basis-0 rounded-[35px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-fit max-md:px-5 max-md:max-w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-6 text-3xl text-black whitespace-nowrap bg-blue-100 border border-white border-solid rounded-[35px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                >
                  Submit
                </button>
              </form>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f131180d8b8b96c1a9c0f539bb563e2306ff02b1?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Divider"
              className="object-contain shrink-0 mt-3.5 w-0.5 aspect-[0]"
            />
            <div>
              <div className="flex flex-col items-start pr-12 pl-4 text-3xl font-light text-center text-white max-md:pr-5">
                <h2 className="text-4xl font-semibold">Important Links</h2>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dc9414155ae63de77d095f9b718c36cc7d95bfa?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  alt="Divider"
                  className="object-contain self-center mt-2.5 max-w-full aspect-[83.33] w-[172px]"
                />
                <a href="#" className="mt-14 ml-12 max-md:mt-10 max-md:ml-2.5">
                  FAQs
                </a>
                <a href="#" className="self-center mt-7">
                  Privacy Policy
                </a>
                <a href="#" className="mt-7 ml-11 max-md:ml-2.5">
                  Support
                </a>
              </div>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
