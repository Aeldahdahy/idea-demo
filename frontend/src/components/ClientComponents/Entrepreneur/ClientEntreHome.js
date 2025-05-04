import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/20/solid';
import image from '../../../assets/img-0.56.png';

function PricingComponent({ name, price }) {

  const tiers = [
    {
      name: 'Basic',
      id: 'tier-Basic',
      href: '#',
      priceMonthly: 'Free',
      description: "The perfect plan if you're just getting started with one project.",
      features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
      featured: false,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      priceMonthly: '$99',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        'Dedicated support representative',
        'Marketing automations',
        'Custom integrations',
      ],
      featured: true,
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
    return (
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-[#163696] ">Pricing</h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
              )}
            >
              <h3
                id={tier.id}
                className={classNames(tier.featured ? 'text-indigo-400' : 'text-[#163696] ', 'text-base/7 font-semibold')}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-5xl font-semibold tracking-tight',
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
              </p>
              <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                {tier.description}
              </p>
              <ul
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm/6 sm:mt-10',
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={classNames(tier.featured ? 'text-indigo-400' : 'text-[#163696] ', 'h-6 w-5 flex-none')}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'text-[#163696]  ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                )}
              >
                Get started today
              </a>
            </div>
          ))}
        </div>
      </div>
    );
}

function ClientEntreHome() {
  return (
    <div className="client-entre-home bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#163696] to-[#3B59B8] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Connect with Investors
              </h1>
              <p className="mt-6 text-lg text-indigo-100">
                You're just <span className="font-semibold underline">steps away</span> from turning your vision into reality. Join our network and pitch to top investors today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/client-portal/entrepreneur/entreProjectData"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[#163696]  font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Create Your Pitch
                </Link>
                <Link
                  to="/learn-more"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-[#163696]  transition duration-300"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-8">
                <p className="text-sm text-indigo-200">Follow Us</p>
                <div className="mt-2 flex gap-4 justify-center lg:justify-start">
                  <Link to={"#"} className="text-indigo-200 hover:text-white transition duration-300">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </Link>
                  <Link to={"#"} className="text-indigo-200 hover:text-white transition duration-300">
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </Link>
                  <Link to={"#"} className="text-indigo-200 hover:text-white transition duration-300">
                    <i className="fa-brands fa-instagram text-xl"></i>
                  </Link>
                  <Link to={"#"} className="text-indigo-200 hover:text-white transition duration-300">
                    <i className="fa-brands fa-twitter text-xl"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"></div>
              </div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm mx-auto transform hover:scale-105 transition duration-300">
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    alt="Investor"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">BOB</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Angel Investor</p>
                    <span className="text-xs text-[#163696] ">Egypt</span>
                  </div>
                  <div className="ml-auto">
                    <i className="fa-solid fa-bell text-gray-400"></i>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">EGP 150,000,000</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Net Worth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Three simple steps to connect with investors and secure funding.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#163696] to-[#3B59B8] text-white font-bold">1</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Create Your Project</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Build a compelling pitch using our guided template with step-by-step instructions.
              </p>
            </div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#163696] to-[#3B59B8] text-white font-bold">2</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Connect with Investors</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                List your pitch on our network and reach out to investors matching your criteria.
              </p>
            </div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#163696] to-[#3B59B8] text-white font-bold">3</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Get Funded</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Schedule meetings with interested investors and secure your investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingComponent />
    </div>
  );
}

export default ClientEntreHome;