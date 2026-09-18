import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. What Are Cookies',
    body: `Cookies are small text files placed on your device when you visit our website. They help the site function properly, remember your preferences, and give us a general sense of how our online services are used so we can improve them.`,
  },
  {
    title: '2. How We Use Cookies',
    body: `We use cookies to keep you signed in to your library account, remember display preferences such as language or theme, and understand which pages of our website and online catalog are most useful to visitors. We do not use cookies to build advertising profiles.`,
  },
  {
    title: '3. Types of Cookies We Use',
    body: `Essential cookies are required for core features like signing in and are always active. Preference cookies remember choices you've made, such as your last catalog search filters. Analytics cookies help us understand overall site usage in aggregate; they do not identify you personally and are only set if you allow them.`,
  },
  {
    title: '4. Your Choices',
    body: `When you first visit our website, you can choose to accept all cookies, allow only essential cookies, or manage your preference by category. You can change your choice at any time by clearing your browser's site data or using the cookie settings link in our website footer.`,
  },
  {
    title: '5. Managing Cookies in Your Browser',
    body: `Most browsers let you view, delete, or block cookies through their settings menu. Blocking essential cookies may prevent some features of our website, such as staying signed in, from working correctly.`,
  },
  {
    title: '6. Third-Party Cookies',
    body: `Some pages may embed content from third parties, such as a Google Maps location or a Facebook post. These third parties may set their own cookies when their content loads, governed by their own privacy and cookie policies rather than ours.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `This Cookie Policy may be updated periodically to reflect changes in our practices or applicable law. We encourage you to review this page occasionally to stay informed.`,
  },
  {
    title: '8. Contact Us',
    body: `If you have questions about this Cookie Policy, please reach us at info@cplcdo.gov.ph or (088) 856-1234, or visit us at Capt. Vicente Roa Street, Cagayan de Oro City, Misamis Oriental.`,
  },
];

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* Header band */}
      <div className="bg-[#025aa7] text-white pt-16 pb-14 px-5 md:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        <div className="max-w-4xl mx-auto relative">
          <Link to="/" className="text-blue-200 hover:text-white text-sm inline-flex items-center gap-2 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="text-blue-100 mt-4 max-w-xl leading-relaxed">
            How the City Public Library of Cagayan de Oro uses cookies on this website.
            Last updated September 18, 2026.
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

export default CookiePolicy;