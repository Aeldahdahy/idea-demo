import React from 'react';
import image45 from "../../assets/image45.png";
import image46 from "../../assets/image46.png";
import image47 from "../../assets/image47.png";
import image48 from "../../assets/img-0.44.png";

function AboutUs() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <div className="mb-8">
          <h1 className="text-[10vw] sm:text-[8rem] md:text-[10rem] leading-none font-bold">
            <span className="block text-left ml-[3%] font-serif text-black">IDEA</span>
            <span className="block text-left ml-[3%] font-serif text-[#0029A4] mt-4 mb-[9%]">VENTURE</span>
          </h1>
        </div>
        <div>
          <img src={image45} alt="Cityscape" className="w-[97%] h-auto mx-auto my-8 rounded-md" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-8">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Stats Section */}
          <div className="flex-1 min-w-[300px] flex flex-col justify-start gap-20 text-left ml-[5%]">
            <div>
              <h2 className="text-[#0029A4] text-[6vw] sm:text-[4.5rem] md:text-[5.625rem] font-serif">40</h2>
              <p className="text-base sm:text-lg mt-1 font-serif">Projects Available</p>
            </div>
            <div>
              <h2 className="text-[#0029A4] text-[6vw] sm:text-[4.5rem] md:text-[5.625rem] font-serif">25+</h2>
              <p className="text-base sm:text-lg mt-1 font-serif">Funded Projects</p>
            </div>
            <div>
              <h2 className="text-[#0029A4] text-[6vw] sm:text-[4.5rem] md:text-[5.625rem] font-serif">15+</h2>
              <p className="text-base sm:text-lg mt-1 font-serif">Happy Users</p>
            </div>
            <div>
              <h2 className="text-[#0029A4] text-[6vw] sm:text-[4.5rem] md:text-[5.625rem] font-serif">6+</h2>
              <p className="text-base sm:text-lg mt-1 font-serif">Employees</p>
            </div>
            {/* Owners Section */}
            <section className="mt-8 px-4">
              <div className="flex flex-wrap justify-center gap-6">
                {/* Owner 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img src={image48} alt="Owner 1" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">Abdelrahman Tarek</h3>
                  <p className="text-xs sm:text-sm text-gray-500">CEO</p>
                </div>
                {/* Owner 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img src={image48} alt="Owner 2" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">Sara Khaled</h3>
                  <p className="text-xs sm:text-sm text-gray-500">CTO</p>
                </div>
                {/* Owner 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img src={image48} alt="Owner 3" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">Omar Hassan</h3>
                  <p className="text-xs sm:text-sm text-gray-500">COO</p>
                </div>
                {/* Owner 4 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img src={image48} alt="Owner 4" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">Laila Ali</h3>
                  <p className="text-xs sm:text-sm text-gray-500">CFO</p>
                </div>
                {/* Owner 5 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img src={image48} alt="Owner 5" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">Mohamed Nour</h3>
                  <p className="text-xs sm:text-sm text-gray-500">CMO</p>
                </div>
                {/* Owner 6 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img src={image48} alt="Owner 6" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">Fatima Youssef</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Head of Design</p>
                </div>
              </div>
            </section>
          </div>

          {/* About Right */}
          <div className="flex-1 min-w-[300px] sm:min-w-[600px] flex flex-col pl-[5%] pr-[5%] border-l-2 border-[#888888b4]">
            <div className="mb-6">
              <p className="text-[4vw] sm:text-[1.25rem] md:text-[1.5625rem] mb-4 leading-loose text-black font-serif">
                Welcome to IDEA-Venture, the Innovation Development Entrepreneurship Agency. 
                We are dedicated to empowering entrepreneurs by connecting them with the capital 
                and resources needed to bring their visions to life.
              </p>
              <p className="text-[4vw] sm:text-[1.25rem] md:text-[1.5625rem] mb-4 leading-loose text-black font-serif">
                Through our user-friendly online platform, we simplify the investment process, 
                making it seamless for investors to discover promising opportunities and for 
                entrepreneurs to secure essential funding.
              </p>
            </div>
            <div className="flex flex-row gap-4 mb-6">
              <img src={image46} alt="Team Discussion" className="w-full max-w-[280px] rounded-md object-cover" />
              <img src={image47} alt="Mentorship" className="w-full max-w-[280px] rounded-md object-cover" />
            </div>

            {/* Benefits Section */}
            <div className="flex flex-col sm:flex-row justify-center items-start gap-8 sm:gap-24 py-12 font-serif">
              <div className="flex-1 text-[3.5vw] sm:text-[1rem] md:text-[1.21875rem]">
                <h4 className="text-[2.5vw] sm:text-xs md:text-sm bg-[#0029A4] text-white px-2 py-1 inline-block mb-8 tracking-wide">BENEFITS</h4>
                <p className="mb-8">
                  We offer comprehensive support to entrepreneurs, according to their needs.
                </p>
                <ul className="list-none pl-4 mt-8">
                  <li className="mb-2 mt-2 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-black">
                    Request Mentorship For your project
                  </li>
                  <li className="mb-2 mt-2 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-black">
                    Legal Support for your contracts
                  </li>
                  <li className="mb-2 mt-2 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-black">
                    Expert Auditors for any Financial Support
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <div className="w-[215px] h-[215px] rounded-full bg-[#0029A4] text-white flex justify-center items-center flex-col">
                  <h2 className="text-[10vw] sm:text-[4rem] md:text-[5rem] font-serif m-0">84%</h2>
                  <p className="text-[2.5vw] sm:text-xs md:text-sm m-0">Success Ratio</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 border-t-2 border-b-2 border-[#888888b4]">
              <h3 className="text-[5vw] sm:text-2xl md:text-3xl font-bold font-serif text-left w-full sm:w-[83%] mb-4 sm:mb-0">
                Contact Us <span className="text-black pr-[2%]">for Any kind of Help!</span>
              </h3>
              <button className="px-5 py-1 bg-[#0029A4] text-white rounded-md text-sm sm:text-base font-medium cursor-pointer">
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;