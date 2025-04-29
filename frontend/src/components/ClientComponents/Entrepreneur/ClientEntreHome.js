import React from 'react';

function ClientEntreHome() {
  return (
    <div className="client-entre-home">
      {/* Welcome Section */}

      <section className="welcome-section">
  <div className="welcome-content">
    <h2 className="welcome-heading">Welcome to the network!</h2>
    <p className="welcome-text">
      You’re <span className="underline">steps away</span> from connecting with investors and taking your <span className="underline">business</span> to the next level. Find out how it works below.
    </p>

    <button className="create-pitch-btn">Create a pitch</button>

    <div className="social-section">
      <small>Follow Us</small>
      <div className="social-icons">
        <i className="fa-solid fa-envelope"></i>
        <i className="fa-brands fa-whatsapp"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-twitter"></i>
      </div>
    </div>
  </div>

  <div className="welcome-image">
    <div className="stars">
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
    </div>

    <div className="investor-card">
      <div className="card-header">
        <img src="https://via.placeholder.com/40" alt="Investor" className="investor-avatar" />
        <div>
          <h4>BOB</h4>
          <p>Angel Investor</p>
          <span className="location">Egypt</span>
        </div>
        <div className="bell-icon">
          <i className="fa-solid fa-bell"></i>
        </div>
      </div>
      <div className="card-body">
        <p>EGP 150,000,000</p>
        <small>Net Worth</small>
      </div>
    </div>

    <div className="swoosh"></div>
  </div>
</section>


      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1ST</h3>
            <h4>Create Your Project</h4>
            <p>Add a pitch for your business using our tried-and-tested template. The on-screen instructions will guide you through the steps.</p>
          </div>
          <div className="step">
            <h3>2ND</h3>
            <h4>Connect with investors</h4>
            <p>After choosing a package, your pitch will be listed on your chosen networks for investors to consider. Search and nudge investors that meet your criteria to maximize your investor reach.</p>
          </div>
          <div className="step">
            <h3>3RD</h3>
            <h4>Get funded</h4>
            <p>If an investor likes your pitch, you will receive an email from the Auditor asking to connect. You'll then be able to schedule calls, fix meetings, and close investment!</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages-section">
        <h2>Packages designed to suit your needs</h2>
        <div className="packages">
          <div className="package basic-package">
            <h3>Basic Package</h3>
            <p>Good for connecting with basic investors</p>
            <h4>Free for all users</h4>
            <h5> Our standard package: </h5>
            <ul>
              <li>Create your pitch using our online form with images, documents, and videos.</li>
              <li>Your pitch will be listed on our website after approval.</li>
              <li>You can request mentorship services in specific fields only (2 sessions).</li>
            </ul>
          </div>
          <div className="package premium-package">
            <div className="recommended">Recommended</div>
            <h3>Premium Package</h3>
            <p>Ideal for connecting with investors worldwide</p>
            <h4>500 EGP per month</h4>
            <h5> All the benefits of Pro plus: </h5>
            <ul>
              <li>Your pitch will be listed on all our networks, which cover about 12 countries worldwide.</li>
              <li>Your pitch will be listed on our website after approval in front of our Angel investors network.</li>
              <li>You can request mentorship services in all fields (8 sessions).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientEntreHome;