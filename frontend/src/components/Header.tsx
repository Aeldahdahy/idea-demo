"use client";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-5 max-md:p-5 max-sm:flex-col max-sm:items-start">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/28a2da6dc5895eab0b6938357e7d8f166b8336b7?placeholderIfAbsent=true"
        alt="IDEA'S LOGO"
        className="h-[100px] w-[274px]"
      />
      <nav className="flex gap-10 text-3xl text-black max-sm:hidden">
        <a href="#home">Home</a>
        <a href="#invest">Invest</a>
        <a href="#fundraise">Fundraise</a>
        <a href="#blogs">Blogs</a>
        <a href="#about">About-Us</a>
        <a href="#contact">Contact-Us</a>
      </nav>
      <div className="flex gap-5 items-center max-sm:self-end">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/20a58b67fed720c0502ee54aa6bf1d857dd5e8a4?placeholderIfAbsent=true"
          alt="User profile icon"
          className="rounded-full h-[47px] w-[47px]"
        />
        <div className="flex gap-1.5 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5020ce9eecfb91dd15b6ef7ba17946d47192824?placeholderIfAbsent=true"
            alt="Language"
            className="h-7 rounded-full w-[31px]"
          />
          <span>EN</span>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg id=&quot;1736:3269&quot; layer-name=&quot;Language Arrow&quot; width=&quot;20&quot; height=&quot;21&quot; viewBox=&quot;0 0 20 21&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;language-arrow&quot; style=&quot;width: 20px; height: 21px&quot;> <path d=&quot;M9.29289 11.7071C9.68342 12.0976 10.3166 12.0976 10.7071 11.7071L17.0711 5.34315C17.4616 4.95262 17.4616 4.31946 17.0711 3.92893C16.6805 3.53841 16.0474 3.53841 15.6569 3.92893L10 9.58579L4.34315 3.92893C3.95262 3.53841 3.31946 3.53841 2.92893 3.92893C2.53841 4.31946 2.53841 4.95262 2.92893 5.34315L9.29289 11.7071ZM9 10V11H11V10H9Z&quot; fill=&quot;black&quot;></path> </svg>",
            }}
          />
        </div>
        <button aria-label="Search" className="search-button">
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg id=&quot;1736:3272&quot; layer-name=&quot;Search Icon (Website)&quot; width=&quot;30&quot; height=&quot;30&quot; viewBox=&quot;0 0 30 30&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;search-icon&quot; style=&quot;width: 30px; height: 30px&quot;> <path d=&quot;M26.25 26.25L20.8125 20.8125M23.75 13.75C23.75 19.2728 19.2728 23.75 13.75 23.75C8.22715 23.75 3.75 19.2728 3.75 13.75C3.75 8.22715 8.22715 3.75 13.75 3.75C19.2728 3.75 23.75 8.22715 23.75 13.75Z&quot; stroke=&quot;black&quot; stroke-width=&quot;4&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;></path> </svg>",
            }}
          />
        </button>
      </div>
    </header>
  );
}
