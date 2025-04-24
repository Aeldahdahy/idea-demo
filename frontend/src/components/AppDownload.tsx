export default function AppDownload() {
  return (
    <section className="relative px-20 py-16 bg-slate-900 max-md:p-5 max-sm:p-2.5">
      {/* Background SVG paths */}
      <div
        className="absolute left-0 top-[26px]"
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=&quot;1729:3406&quot; layer-name=&quot;path1&quot; width=&quot;1728&quot; height=&quot;963&quot; viewBox=&quot;0 0 1728 963&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M691.89 587L1738 0V963H-28L691.89 587Z&quot; fill=&quot;#152860&quot;></path></svg>",
        }}
      />
      <div
        className="absolute left-0 top-[260px]"
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=&quot;1729:3407&quot; layer-name=&quot;path2&quot; width=&quot;1728&quot; height=&quot;729&quot; viewBox=&quot;0 0 1728 729&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M691.89 444.364L1738 0V729H-28L691.89 444.364Z&quot; fill=&quot;#1E3A8A&quot;></path></svg>",
        }}
      />
      <div
        className="absolute left-0 top-[477px]"
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=&quot;1729:3408&quot; layer-name=&quot;path3&quot; width=&quot;1728&quot; height=&quot;512&quot; viewBox=&quot;0 0 1728 512&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M691.89 312.091L1738 0V512H-28L691.89 312.091Z&quot; fill=&quot;#1E40AF&quot;></path></svg>",
        }}
      />
      <div
        className="absolute left-0 top-[697px]"
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=&quot;1729:3409&quot; layer-name=&quot;path4&quot; width=&quot;1728&quot; height=&quot;292&quot; viewBox=&quot;0 0 1728 292&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M691.89 177.99L1738 0V292H-28L691.89 177.99Z&quot; fill=&quot;#1D4ED8&quot;></path></svg>",
        }}
      />

      <div className="relative text-center text-white z-[1]">
        <h2 className="mb-10 text-3xl max-sm:text-2xl">
          Seamless Experience: Our Platform Now Also Accessible via Mobile App
        </h2>
        <div className="flex flex-col gap-5 items-center mb-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad0089a69e8c5a153d0b599d9d7b8a9627a9f5dd?placeholderIfAbsent=true"
            alt="Step 1"
            className="h-[60px] w-[61px]"
          />
          <p>Search for opportunists through your private interface.</p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/72949ea45b9d6685f0d2e016adb4852d09958abf?placeholderIfAbsent=true"
            alt="Step 2"
            className="h-[60px] w-[61px]"
          />
          <p>Request a meeting to discuss deals with investors</p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c72ec7f21fd6b891176233daa4c2e335ca72504?placeholderIfAbsent=true"
            alt="Step 3"
            className="h-[60px] w-[61px]"
          />
          <p>Manage your project grow and your portfolio.</p>
        </div>
        <div className="flex flex-col gap-2.5 items-center">
          <span>Download the app</span>
          <div className="flex gap-8">
            {/* App Store and Google Play buttons with SVG content */}
            <a href="#" aria-label="Download on App Store">
              <div
                dangerouslySetInnerHTML={{
                  __html: "<!-- App Store SVG content -->",
                }}
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <div
                dangerouslySetInnerHTML={{
                  __html: "<!-- Google Play SVG content -->",
                }}
              />
            </a>
          </div>
          <p>Available on Android and iOS.</p>
        </div>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d3bf213c90b4ac41892ee273e5abd346957fa6?placeholderIfAbsent=true"
        alt="App Image"
        className="absolute right-20 rounded-3xl h-[745px] top-[260px] w-[470px] max-md:right-5"
      />
    </section>
  );
}
