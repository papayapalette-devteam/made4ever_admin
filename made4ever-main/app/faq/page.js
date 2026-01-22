'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* Title */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            FAQ 
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-2">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 space-y-10 leading-relaxed">

    {/* FAQ 1 */}
    <div>
      <h3 className="font-semibold text-lg mb-2">
        Q. How can I register on Made4Ever.in?
      </h3>
      <p className="text-gray-700 leading-relaxed">
        To register as a Marriage Bureau on Made4Ever.in, please follow the steps below:
      </p>
      <ul className="list-decimal pl-6 mt-2 space-y-1 text-gray-700">
        <li>Visit <strong>Made4Ever.in</strong></li>
        <li>Click on the <strong>“Register”</strong> button</li>
        <li>Select <strong>“Register As”</strong></li>
        <li>
          Fill in the required details such as <strong>Name, Email, Password,
          Confirm Password, Address, Identity Type, Identity Number</strong>
        </li>
        <li>Upload your valid identity proof</li>
        <li>Check the box <strong>“I accept Terms & Conditions”</strong></li>
        <li>Click on the <strong>“Submit”</strong> button</li>
        <li>
          An email verification link will be sent to your registered email ID.
          Click the link to complete your registration.
        </li>
      </ul>
    </div>

    {/* FAQ 2 */}
    <div>
      <h3 className="font-semibold text-lg mb-2">
        Q. How can I complete or edit my profile on Made4Ever.in?
      </h3>
      <p className="text-gray-700 leading-relaxed">
        If you have already registered as a Marriage Bureau and wish to update or
        edit your profile, follow these steps:
      </p>
      <ul className="list-decimal pl-6 mt-2 space-y-1 text-gray-700">
        <li>Log in to your account using your registered email ID and password</li>
        <li>Click on <strong>“View / Edit Profile”</strong></li>
        <li>Update or modify the required profile details</li>
        <li>Once completed, click on the <strong>“Submit”</strong> button</li>
        <li>Your profile will be updated successfully</li>
      </ul>
    </div>





      



           

 


           

  


 


 


         

        




  


         

       

          

 


          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
