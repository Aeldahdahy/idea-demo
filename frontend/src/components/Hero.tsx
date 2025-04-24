export default function Hero() {
  return (
    <section className="mb-16">
      <h1 className="text-6xl italic text-black max-sm:text-5xl">
        We make it easy to start your project.
      </h1>
      <p className="text-4xl text-black max-sm:text-3xl">
        <span>Browse </span>
        <strong>hundreds of investment opportunities</strong>
        <span>, connect with </span>
        <strong>investors</strong>
        <span> and </span>
        <strong>manage</strong>
        <span>
          {" "}
          your investment contacts with the world's investors network.
        </span>
      </p>
      <div className="flex gap-5 items-center mt-5">
        <strong className="text-xl">Follow Us</strong>
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
    </section>
  );
}
