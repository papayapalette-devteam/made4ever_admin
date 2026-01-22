'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* Title */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Privacy <span className="text-[#bf5281]">Policy</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 space-y-10 leading-relaxed">

            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Introduction
              </h2>
              <p>
                Made4ever is an online matrimonial portal that offers efficient matrimonial services.
                We are committed to maintain the privacy of the information provided by our users.
                We have declared this privacy statement to safeguard the privacy concern of the users.
              </p>
            </div>

            {/* Policy Overview */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Privacy Policy Overview
              </h2>
              <p>
                Made4ever has a very strict privacy policy considering the sensitivity of the information
                of customers, which we have. We have prepared the Privacy Policy based on the feedbacks
                and suggestions received from the customers.
              </p>
              <p className="mt-3">
                Before disclosing your personal information, you have to read the terms and conditions
                and should provide information accordingly. By accepting the terms and condition you
                acknowledge that you have provided all information voluntarily. Also you are giving
                authority to Made4ever to use your personal information according to nature of business
                as per the privacy policy.
              </p>
              <p className="mt-3">
                If you have any concern over our terms and condition, you are requested to no use or
                take services from our website.
              </p>
            </div>

            {/* Information Collected */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Information We Collect
              </h2>
              <p>
                We collect following information (not limited to) from the customers and other users
                who take our services:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Email Address</li>
                <li>Date of Birth</li>
                <li>First Name and Last Name</li>
                <li>Educational qualifications</li>
                <li>Password</li>
                <li>Mailing address</li>
                <li>Zip/Pin</li>
                <li>Contact details</li>
                <li>Personal details</li>
              </ul>
              <p className="mt-4">
                If you are paying using credit card, then you have to give more information for billing
                purpose like credit/debit card number, card expiration date and Demand drafts or cheques
                information.
              </p>
            </div>

            {/* Use of Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Use of Your Information
              </h2>
              <p>
                Made4ever.in uses your information as per the requirement of the online system and
                provides best experience to our customers.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Made4ever never rents, sells or loans your information to any third party</li>
                <li>
                  Your information may be shared with our company associates, partner companies or
                  any other subsidiaries
                </li>
                <li>Taking care of your information is our utmost priority</li>
              </ul>
              <p className="mt-4">
                For any legal or law process, where your information may be required, we are bound to
                provide the information in such situations.
              </p>
              <p className="mt-3">
                Any other website which is linked to our website may gather your personal information;
                we are not responsible for their privacy policy.
              </p>
            </div>

            {/* Visitors, Payments & Cookies */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Visitors, Payments & Cookies
              </h2>
              <p>
                Customers who are visiting our website to just view or see ads need not pay anything.
                Customers can visit the site without paying or giving any personal information, it is
                recommended to provide your information to get the best results.
              </p>
              <p className="mt-3">
                Your credit card and transaction details will be kept safe on our highly secure servers.
              </p>
              <p className="mt-3">
                To store your personal information cookies will be used. Cookies are files that save
                your personal information on your local machine. Cookies can be used by third parties
                or any other websites which are not in our control.
              </p>
              <p className="mt-3">
                Customer can contact any profiles they like after providing personal informal,
                verification and paying for desired plan. There is a limitation of each and every
                plan. Customer should always go through the conditions carefully before selecting
                any plan.
              </p>
            </div>

            {/* Policy Updates */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Policy Updates
              </h2>
              <p>
                Privacy policy of Made4ever gets updated on regular basis as per the feedback from
                customers or any company level decisions. You are requested to go through our privacy
                policy regularly to see all the changes or updates.
              </p>
              <p className="mt-3">
                You can, at any time unsubscribe our services, promotion by logging in to the site.
              </p>
            </div>

            {/* Grievance */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Feedback & Grievance
              </h2>
              <p>
                For any feedback or grievance you can always contact us or write to us. Your concerns
                will be taken at most priority.
              </p>
              <p className="mt-3">
                We have a Grievance officer appointed as per the information technology act
              </p>
              <p className="mt-2 font-medium">
                Section 5(9), 2011.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
