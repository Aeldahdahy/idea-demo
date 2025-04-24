export default function InvestorRequest() {
  return (
    <section className="flex justify-center mb-16 max-sm:flex-col">
      <article className="flex gap-5 items-center p-5 bg-violet-100 rounded-[40px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d3bf213c90b4ac41892ee273e5abd346957fa6?placeholderIfAbsent=true"
          alt="Investor Request"
          className="rounded-full h-[142px] w-[142px]"
        />
        <div className="text-black">
          <h2 className="text-4xl font-bold">Abdelrahman</h2>
          <p className="text-4xl">Investor request</p>
          <div className="flex flex-col gap-2.5">
            <span className="text-2xl">150,000,000 EGP</span>
            <span>Net Worth</span>
            <span>1,000,000 EGP</span>
            <span className="text-xl">Minimum Investment</span>
          </div>
        </div>
      </article>
    </section>
  );
}
