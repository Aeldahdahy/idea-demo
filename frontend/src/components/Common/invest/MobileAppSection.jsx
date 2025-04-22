import React from "react";

function MobileAppSection() {
  return (
    <section className="flex flex-col pt-24 pr-20 pl-9 mt-72 w-full bg-slate-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-3xl tracking-tighter text-center text-white leading-[86px] max-md:max-w-full">
        Seamless Experience: Our Platform Now Also Accessible via Mobile App
      </h2>
      <div className="z-10 mt-20 -mb-4 w-full max-w-[1498px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[65%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex z-10 flex-col self-stretch pl-5 w-full max-md:max-w-full">
                <div className="flex flex-wrap gap-3.5">
                  <div className="my-auto">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a39aa70844f377d8877c85e557b86f96dfb96900?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                      alt="Feature Icon"
                      className="object-contain aspect-[1.02] w-[61px]"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6232b12c7b72a4a29282e2e00f5696e6eafa5b77?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                      alt="Feature Icon"
                      className="object-contain mt-8 aspect-[1.02] w-[61px]"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/68e65d213653dede69c85cd5a84748327c655ba9?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                      alt="Feature Icon"
                      className="object-contain mt-7 aspect-[1.02] w-[61px]"
                    />
                  </div>
                  <div className="flex-auto text-3xl tracking-tighter text-white leading-[86px] w-[781px] max-md:max-w-full">
                    <p>
                      Search and manage deals through your private interface.
                    </p>
                    <p>Request a meeting to discuss deals with projects</p>
                    <p>Manage your investments and grow your portfolio.</p>
                  </div>
                </div>
                <h3 className="self-start mt-5 ml-6 text-3xl tracking-tighter text-white leading-[86px] max-md:ml-2.5">
                  Download the app
                </h3>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/34f41d287b76cd6ddf44a546860a7cac4325cee0?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="App Store Badges"
                className="object-contain -mt-1 max-w-full aspect-[7.63] w-[343px]"
              />
              <p className="ml-10 text-xl tracking-tighter text-white leading-[86px] max-md:ml-2.5">
                Available on Android and iOS.
              </p>
            </div>
          </div>
          <div className="ml-5 w-[35%] max-md:ml-0 max-md:w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a93abb4711467a15340e6046acdd9b712df4c797?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Mobile App Screenshot"
              className="object-contain grow w-full rounded-3xl aspect-[0.63] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileAppSection;
