import React, { useState } from 'react';
import { useFunctions } from '../../useFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const { loading, response, error, contactUs } = useFunctions();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
    sendCopy: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactUs(formData);
  };

  return (
    <>
    <div className="space"></div>
    <section className="mb-32">
      <div id="map" className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.922087036022!2d31.33712221513924!3d30.10363798185652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815c6c6e6c6c7%3A0x3b8c6c6c6c6c6c6c!2sAASTMT%20Graduate%20School%20of%20Business!5e0!3m2!1sen!2seg!4v1698765432109!5m2!1sen!2seg"
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="container px-6 md:px-12">
        <div className="block rounded-2xl bg-gradient-to-br from-white to-gray-50 px-6 py-12 shadow-2xl md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-200">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <div className="flex items-center bg-white rounded-lg border border-gray-300 transition-all duration-300 group-focus-within:border-sky-500 group-focus-within:ring-2 group-focus-within:ring-sky-200">
                    <FontAwesomeIcon icon={faUser} className=" mx-3 text-gray-400" />
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="peer block w-full rounded-lg border-0 bg-transparent py-3 px-3 text-gray-700 focus:ring-0 focus:outline-none transition-all duration-200 placeholder:text-gray-400"
                      id="exampleInput90"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <label
                    className="absolute top-0 left-4 -translate-y-3 bg-gradient-to-r from-white to-gray-50 px-2 text-sm font-medium text-gray-600 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-95 peer-focus:text-sky-600 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100"
                    htmlFor="exampleInput90"
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative group">
                <div className="flex items-center bg-white rounded-lg border border-gray-300 transition-all duration-300 group-focus-within:border-sky-500 group-focus-within:ring-2 group-focus-within:ring-sky-200">
                    <FontAwesomeIcon icon={faEnvelope} className="mx-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer block w-full rounded-lg border-0 bg-transparent py-3 px-3 text-gray-700 focus:ring-0 focus:outline-none transition-all duration-200 placeholder:text-gray-400"
                      id="exampleInput91"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <label
                    className="absolute top-0 left-4 -translate-y-3 bg-gradient-to-r from-white to-gray-50 px-2 text-sm font-medium text-gray-600 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-95 peer-focus:text-sky-600 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100"
                    htmlFor="exampleInput91"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="peer block w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 focus:outline-none transition-all duration-200 placeholder:text-gray-400"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Your Message"
                    required
                  ></textarea>
                  <label
                    className="absolute top-0 left-4 -translate-y-3 bg-gradient-to-r from-white to-gray-50 px-2 text-sm font-medium text-gray-600 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-95 peer-focus:text-sky-600 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100"
                    htmlFor="exampleInput90"
                  >
                    Message
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 px-6 text-sm font-semibold uppercase tracking-wide hover:from-sky-600 hover:to-sky-700 focus:ring-2 focus:ring-sky-200 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
              {response && (
                <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg animate-fade-in">
                  <p className="text-sm font-medium">{response}</p>
                </div>
              )}
              {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg animate-fade-in">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
              <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">Technical support</p>
                      <p className="text-sm text-neutral-500">idea-venture2025@outlook.com</p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">Address</p>
                      <p className="text-sm text-neutral-500">
                        Sheraton, Heliopolis
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">Mobile 1</p>
                      <p className="text-neutral-500">+20 1018677727</p>
                    </div>
                  </div>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">Mobile 2</p>
                      <p className="text-neutral-500">+20 1150088672</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Contact;