// src/public-client/Routes/Sections/HomePageSection/LinkSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    href: '/catalog?view=advanced',
    label: 'Catalog',
    title: 'Online Public Access Catalog (OPAC)',
    description: 'Search the full collection by title, author, or category — books, journals, and digital resources.',
    cta: 'Search the catalog',
    openInNewTab: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: '/Document/library-policy-manual.pdf',
    label: 'Reference',
    title: 'Library Policy Manual',
    description: 'Borrowing guidelines, circulation rules, and code of conduct for library patrons.',
    cta: 'Read the manual',
    openInNewTab: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const LinkSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-[Poppins] text-xs font-semibold tracking-wide text-[#3f7fb3] mb-2">
            Quick access
          </p>
          <h2 className="font-[Poppins] text-2xl sm:text-3xl font-bold text-[#1f2a37]">
            Library resources
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((link) => {
            const isExternalFile = link.href.endsWith('.pdf');
            return isExternalFile ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-xl border border-[#dce8f2] bg-white p-7 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(2,90,167,0.12)] hover:-translate-y-1"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#eaf1f8] transition-transform duration-500 group-hover:scale-125" />

                <div className="relative flex items-center justify-center w-14 h-14 rounded-lg bg-[#025aa7] text-white mb-5 shadow-[0_4px_10px_rgba(2,90,167,0.25)]">
                  {link.icon}
                </div>

                <span className="relative font-[Poppins] text-xs font-semibold uppercase tracking-wide text-[#3f7fb3] mb-1">
                  {link.label}
                </span>

                <h3 className="relative font-[Poppins] text-lg font-semibold text-[#1f2a37] mb-2">
                  {link.title}
                </h3>

                <p className="relative text-sm text-gray-500 leading-relaxed mb-5">
                  {link.description}
                </p>

                <span className="relative mt-auto inline-flex items-center gap-1.5 font-[Poppins] text-sm font-semibold text-[#025aa7]">
                  {link.cta}
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#025aa7] transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                className="group relative flex flex-col rounded-xl border border-[#dce8f2] bg-white p-7 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(2,90,167,0.12)] hover:-translate-y-1"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#eaf1f8] transition-transform duration-500 group-hover:scale-125" />

                <div className="relative flex items-center justify-center w-14 h-14 rounded-lg bg-[#025aa7] text-white mb-5 shadow-[0_4px_10px_rgba(2,90,167,0.25)]">
                  {link.icon}
                </div>

                <span className="relative font-[Poppins] text-xs font-semibold uppercase tracking-wide text-[#3f7fb3] mb-1">
                  {link.label}
                </span>

                <h3 className="relative font-[Poppins] text-lg font-semibold text-[#1f2a37] mb-2">
                  {link.title}
                </h3>

                <p className="relative text-sm text-gray-500 leading-relaxed mb-5">
                  {link.description}
                </p>

                <span className="relative mt-auto inline-flex items-center gap-1.5 font-[Poppins] text-sm font-semibold text-[#025aa7]">
                  {link.cta}
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#025aa7] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LinkSection;