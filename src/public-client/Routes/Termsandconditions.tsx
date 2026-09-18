import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using any service offered by the City Public Library of Cagayan de Oro — including library card registration, book borrowing, computer and internet access, and our online catalog — you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.`,
  },
  {
    title: '2. Library Membership',
    body: `Membership is open to residents of Cagayan de Oro City and surrounding areas upon presentation of a valid government-issued ID and proof of address. Library cards are non-transferable. Members are responsible for all activity conducted under their card, including items borrowed and any associated fees.`,
  },
  {
    title: '3. Borrowing and Returns',
    body: `Borrowed materials must be returned or renewed by their due date. Overdue items may incur fines as set by the library's current fee schedule. Lost or damaged materials must be replaced or paid for at their assessed value. Borrowing privileges may be suspended for members with unresolved overdue items or unpaid fines.`,
  },
  {
    title: '4. Use of Facilities and Equipment',
    body: `Computers, internet access, study rooms, and other facilities are provided for research, educational, and personal enrichment purposes. Users must not use library equipment or networks for unlawful activity, harassment, or the distribution of harmful or offensive content. The library reserves the right to limit session times during peak hours.`,
  },
  {
    title: '5. Code of Conduct',
    body: `All visitors are expected to maintain a quiet and respectful environment. Disruptive behavior, damage to library property, or disregard for staff instructions may result in suspension of library privileges or removal from the premises.`,
  },
  {
    title: '6. Privacy',
    body: `Personal information collected during registration is used solely for library administration purposes and is handled in accordance with our Privacy Policy. We do not sell or share member information with third parties except as required by law.`,
  },
  {
    title: '7. Digital and Online Services',
    body: `Our website, online catalog, and digital resources are provided "as is." While we strive for accuracy and availability, the library does not guarantee uninterrupted access and is not liable for any loss arising from reliance on information found through our digital services.`,
  },
  {
    title: '8. Changes to These Terms',
    body: `These Terms and Conditions may be updated periodically to reflect changes in library policy or applicable law. Continued use of our services after changes are posted constitutes acceptance of the revised terms.`,
  },
  {
    title: '9. Contact Us',
    body: `If you have questions about these Terms and Conditions, please reach us at info@cplcdo.gov.ph or (088) 856-1234, or visit us at Capt. Vicente Roa Street, Cagayan de Oro City, Misamis Oriental.`,
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* Header band */}
      <div className="bg-[#025aa7] text-white pt-16 pb-14 px-5 md:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        <div className="max-w-4xl mx-auto relative">
          <Link to="/" className="text-blue-200 hover:text-white text-sm inline-flex items-center gap-2 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms &amp; Conditions</h1>
          <p className="text-blue-100 mt-4 max-w-xl leading-relaxed">
            The rules that govern your use of the City Public Library of Cagayan de Oro,
            in print and online. Last updated September 18, 2026.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 lg:px-16 py-16">
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-[#025aa7]/10 pb-10 last:border-0">
              <h2 className="text-xl font-semibold text-[#025aa7] mb-3">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed max-w-2xl">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#025aa7]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} City Public Library • Cagayan de Oro City. All Rights Reserved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#025aa7] text-white hover:bg-[#024a8c] font-medium px-6 py-3 rounded-2xl transition-all duration-300 text-sm shadow-md"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;