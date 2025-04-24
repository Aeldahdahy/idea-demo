export default function Footer() {
  return (
    <footer className="px-20 py-16 text-white bg-blue-900 max-md:p-5 max-sm:p-2.5">
      <div className="flex justify-between mb-10 max-sm:flex-col max-sm:items-center">
        <nav className="flex flex-col gap-2.5 max-sm:items-center">
          <h3 className="text-4xl font-bold">Navigation</h3>
          <a href="#home">Home</a>
          <a href="#invest">Invest</a>
          <a href="#fundraise">Fundraise</a>
          <a href="#blogs">Blogs</a>
          <a href="#about">About-Us</a>
          <a href="#contact">Contact-Us</a>
        </nav>

        <div className="flex flex-col gap-2.5 max-sm:items-center">
          <h3 className="text-4xl font-bold">Our Newsletter</h3>
          <p>Subscribe to our newsletter</p>
          <form className="flex gap-2.5 max-sm:flex-col">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="p-2.5 text-3xl bg-white border border-white border-solid rounded-[35px] text-black text-opacity-50 w-[300px] max-sm:w-full"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-3xl text-black bg-blue-100 border border-white border-solid rounded-[35px]"
            >
              Submit
            </button>
          </form>
        </div>

        <nav className="flex flex-col gap-2.5 max-sm:items-center">
          <h3 className="text-4xl font-bold">Important Links</h3>
          <a href="#faqs">FAQs</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#support">Support</a>
        </nav>

        <div className="flex gap-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/221f3f5344c65c667b1dec35ae313d8396971afc?placeholderIfAbsent=true"
            alt="Gmail"
            className="h-[50px] w-[50px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/125cf128ecbd22e915066fb0e30f97738524309c?placeholderIfAbsent=true"
            alt="Phone"
            className="h-[50px] w-[50px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ec71996eec55874c36bde4b3be2dec127c9f882?placeholderIfAbsent=true"
            alt="Instagram"
            className="h-[50px] w-[50px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/750ec5ee601e16a810bd4fbb9167e19583ad9b1d?placeholderIfAbsent=true"
            alt="Facebook"
            className="h-[50px] w-[50px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c72dbc3717d650ebe52c156516de02254689dcf0?placeholderIfAbsent=true"
            alt="Twitter"
            className="h-[50px] w-[50px]"
          />
        </div>
      </div>

      <p className="text-3xl text-center text-black max-sm:text-xl">
        Copyright © 2024 Designed by IDEA.
      </p>
    </footer>
  );
}
