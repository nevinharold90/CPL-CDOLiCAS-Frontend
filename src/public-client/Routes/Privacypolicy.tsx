import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Information We Collect',
    body: `When you register for a library card or use our online services, we collect information such as your full name, address, contact number, email address, and — if applicable — your employee ID and office address. If you use our digital catalog or kiosk services, we may also collect basic usage data such as search history and borrowed titles, solely to support your account and improve our services.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your information to create and manage your library membership, process book borrowing and returns, send due-date or fine reminders, communicate about events and programs, and maintain the security of our facilities and systems. We do not use your information for advertising or marketing unrelated to library services.`,
  },
  {
    title: '3. How We Protect Your Information',
    body: `Your personal information is stored securely and access is limited to authorized library staff who need it to perform their duties. We apply reasonable administrative and technical safeguards to protect your data from unauthorized access, alteration, disclosure, or destruction.`,
  },
  {
    title: '4. Sharing of Information',
    body: `We do not sell, rent, or trade your personal information to third parties. Information may be disclosed only when required by law, requested by a competent government authority, or necessary to protect the rights, property, or safety of the library, its staff, or its members.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your membership and borrowing records for as long as your account remains active and for a reasonable period afterward, as required for recordkeeping and compliance with local government archiving requirements. You may request the deactivation of your account at any time.`,
  },
  {
    title: '6. Your Rights',
    body: `You have the right to access, correct, or request the deletion of your personal information, subject to our recordkeeping obligations. To exercise these rights, please contact us using the details below.`,
  },
  {
    title: '7. Cookies and Online Services',
    body: `Our website and online catalog may use basic cookies to keep you signed in and remember your preferences. We do not use cookies to track you across other websites or to serve third-party advertising.`,
  },
  {
    title: '8. Children\u2019s Privacy',
    body: `Minors may register for a library card with parental or guardian consent. We collect only the information necessary to issue and manage a junior membership and do not knowingly collect additional personal data from children without such consent.`,
  },
  {
    title: '9. Changes to This Policy',
    body: `This Privacy Policy may be updated periodically to reflect changes in our practices or applicable law. Continued use of our services after changes are posted constitutes acceptance of the revised policy.`,
  },
  {
    title: '10. Contact Us',
    body: `If you have questions or concerns about this Privacy Policy or how your information is handled, please reach us at info@cplcdo.gov.ph or (088) 856-1234, or visit us at Capt. Vicente Roa Street, Cagayan de Oro City, Misamis Oriental.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* Header band */}
      <div className="bg-[#025aa7] text-white pt-16 pb-14 px-5 md:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        <div className="max-w-4xl mx-auto relative">
          <Link to="/" className="text-blue-200 hover:text-white text-sm inline-flex items-center gap-2 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-blue-100 mt-4 max-w-xl leading-relaxed">
            How the City Public Library of Cagayan de Oro collects, uses, and protects
            your personal information. Last updated September 18, 2026.
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

export default PrivacyPolicy;