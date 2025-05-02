import React from 'react';
import image45 from "../../assets/image45.png";
import image46 from "../../assets/image46.png";
import image47 from "../../assets/image47.png";
import image48 from "../../assets/img-0.44.png";

function AboutUs() {
  return (
    <div className="entre-home">
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            <span className="idea-text">IDEA</span>
            <span className="venture-text">VENTURE</span>
          </h1>
        </div>
        <div className="hero-image">
          <img src={image45} alt="Cityscape" />
        </div>
      </section>
      
      <section className="about-section">
  <div className="about-content">
    <section className="stats-section">
      <div className="stat">
        <h2>40</h2>
        <p>Projects Available</p>
      </div>
      <div className="stat">
        <h2>25+</h2>
        <p>Funded Projects</p>
      </div>
      <div className="stat">
        <h2>15+</h2>
        <p>Happy Users</p>
      </div>
      <div className="stat">
        <h2>6+</h2>
        <p>Employees</p>
      </div>
      <section className="owners-section mt-8 px-4">
  <div className="flex flex-wrap justify-center gap-6">
    {/* Owner 1 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img src={image48} alt="Owner 1" className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Abdelrahman Tarek</h3>
      <p className="text-sm text-gray-500">CEO</p>
    </div>
    {/* Owner 2 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img src={image48} alt="Owner 2" className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Sara Khaled</h3>
      <p className="text-sm text-gray-500">CTO</p>
    </div>
    {/* Owner 3 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img src={image48} alt="Owner 3" className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Omar Hassan</h3>
      <p className="text-sm text-gray-500">COO</p>
    </div>
    {/* Owner 4 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img src={image48} alt="Owner 4" className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Laila Ali</h3>
      <p className="text-sm text-gray-500">CFO</p>
    </div>
    {/* Owner 5 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img src={image48} alt="Owner 5" className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Mohamed Nour</h3>
      <p className="text-sm text-gray-500">CMO</p>
    </div>
    {/* Owner 6 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img src={image48} alt="Owner 6" className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Fatima Youssef</h3>
      <p className="text-sm text-gray-500">Head of Design</p>
    </div>
  </div>
</section>      
    </section>

    <div className="about-right">
      <div className="about-text">
        <p>
          Welcome to IDEA-Venture, the Innovation Development Entrepreneurship Agency. 
          We are dedicated to empowering entrepreneurs by connecting them with the capital 
          and resources needed to bring their visions to life.
        </p>
        <p>
          Through our user-friendly online platform, we simplify the investment process, 
          making it seamless for investors to discover promising opportunities and for 
          entrepreneurs to secure essential funding.
        </p>
      </div>
      <div className="about-images">
        <img src={image46} alt="Team Discussion" />
        <img src={image47} alt="Mentorship" />
      </div>
      <section className="benefits-section">
        <div className="benefits-text">
          <h4>BENEFITS</h4>
          <p>
            We offer comprehensive support to entrepreneurs, according to their needs.
          </p>
          <ul>
            <li>  Request Mentorship For your project</li>
            <li> Legal Support for your contracts</li>
            <li> Expert Auditors for any Financial Support</li>
          </ul>
        </div>
        <div className="success-ratio">
          <div className="circle">
            <h2>84%</h2>
            <p>Success Ratio</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h3>Contact Us <span>for Any kind of Help!</span></h3>
        <button className="contact-btn">Contact</button>
      </section>
    </div>
  </div>
</section>
  </div>
  );
}

export default AboutUs;
