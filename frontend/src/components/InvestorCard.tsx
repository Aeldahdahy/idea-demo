export default function InvestorCard() {
  return (
    <section className="flex justify-center mb-16 max-sm:flex-col">
      <article className="flex gap-5 items-center p-5 bg-gray-800 rotate-[5.53deg] rounded-[30px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/46aea3a4bf41ba3ccbb5433b4fc13bcb9dbe363e?placeholderIfAbsent=true"
          alt="Investor"
          className="w-20 h-[82px] rounded-[30px]"
        />
        <div className="text-white">
          <h2 className="text-3xl font-bold">BOB</h2>
          <p className="text-xl">Angel Investor</p>
          <div className="flex gap-1.5 items-center">
            <span>Egypt</span>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg id=&quot;1729:3497&quot; layer-name=&quot;Frame&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 20 20&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;location-icon&quot; style=&quot;width: 20px; height: 20px&quot;> <g clip-path=&quot;url(#clip0_1729_3497)&quot;> <path d=&quot;M15 6.6665C15 9.67734 11.7758 12.8573 10.5058 13.9957C10.3606 14.1066 10.1828 14.1668 10 14.1668C9.81719 14.1668 9.63945 14.1066 9.49417 13.9957C8.225 12.8573 5 9.67734 5 6.6665C5 5.34042 5.52678 4.06865 6.46447 3.13097C7.40215 2.19329 8.67392 1.6665 10 1.6665C11.3261 1.6665 12.5979 2.19329 13.5355 3.13097C14.4732 4.06865 15 5.34042 15 6.6665Z&quot; stroke=&quot;black&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;></path> <path d=&quot;M9.99998 8.33333C10.9205 8.33333 11.6666 7.58714 11.6666 6.66667C11.6666 5.74619 10.9205 5 9.99998 5C9.0795 5 8.33331 5.74619 8.33331 6.66667C8.33331 7.58714 9.0795 8.33333 9.99998 8.33333Z&quot; stroke=&quot;black&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;></path> </g></svg>",
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl">EGP 150,000,000</span>
            <span className="text-xs">Net Worth</span>
          </div>
        </div>
      </article>
    </section>
  );
}
