import React from "react";

function Header() {
  return (
    <>
      <header className="flex flex-wrap gap-5 justify-between ml-5 w-full text-3xl text-center text-black whitespace-nowrap max-w-[1641px] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0a9233ef3b0a2fc60634eddf8ab5bfde7bd3ed3?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          alt="Company Logo"
          className="object-contain shrink-0 max-w-full aspect-[2.74] rounded-[85px] w-[274px]"
        />
        <div className="flex gap-6 my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f71b6665b9ad32c1d519159d3acc13f706866a3?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
            alt="Search Icon"
            className="object-contain shrink-0 self-start mt-2.5 aspect-square w-[30px]"
          />
          <div className="flex gap-1 items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8703cd5c6942611e13c573b9d12e607a6ee5452c?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Language Icon"
              className="object-contain shrink-0 self-stretch my-auto aspect-[1.11] rounded-[214px] w-[31px]"
            />
            <span className="self-stretch my-auto">EN</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a68131993137e11660de01a239f61b78d4e9954?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Dropdown"
              className="object-contain shrink-0 self-stretch w-24 aspect-[1.48]"
            />
          </div>
        </div>
      </header>
      <nav className="flex gap-10 self-center mt-3 w-full text-3xl text-center text-black whitespace-nowrap max-w-[1398px] max-md:max-w-full">
        <span className="my-auto">Home</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6078dfaa4995d3c62a0c9f27c399c30528fc97e4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          alt="Divider"
          className="object-contain shrink-0 self-start w-0.5 aspect-[0.06]"
        />
        <span className="my-auto">Invest</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6078dfaa4995d3c62a0c9f27c399c30528fc97e4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          alt="Divider"
          className="object-contain shrink-0 self-start w-0.5 aspect-[0.06]"
        />
        <span className="grow shrink my-auto w-[122px]">Fundraise</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6078dfaa4995d3c62a0c9f27c399c30528fc97e4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          alt="Divider"
          className="object-contain shrink-0 self-start w-0.5 aspect-[0.06]"
        />
        <span>Blogs</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6078dfaa4995d3c62a0c9f27c399c30528fc97e4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          alt="Divider"
          className="object-contain shrink-0 self-start w-0.5 aspect-[0.06]"
        />
        <span className="grow shrink my-auto w-[118px]">About-Us</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6078dfaa4995d3c62a0c9f27c399c30528fc97e4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          alt="Divider"
          className="object-contain shrink-0 self-start w-0.5 aspect-[0.06]"
        />
        <span className="grow shrink my-auto w-[140px]">Contact-Us</span>
      </nav>
    </>
  );
}

export default Header;
