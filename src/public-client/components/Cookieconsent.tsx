// src/components/CookieConsent.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'cplcdo_cookie_consent';

type ConsentValue = {
  essential: true;
  preferences: boolean;
  analytics: boolean;
  decidedAt: string;
};

function readConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentValue) : null;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private browsing, etc.) — consent just won't persist
  }
}

/** Call this anywhere (e.g. a "Cookie Settings" footer link) to re-open the banner. */
export function reopenCookieConsent() {
  window.dispatchEvent(new Event('cplcdo:reopen-cookie-consent'));
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setPreferences(existing.preferences);
      setAnalytics(existing.analytics);
    }

    const handleReopen = () => {
      setShowManage(true);
      setVisible(true);
    };
    window.addEventListener('cplcdo:reopen-cookie-consent', handleReopen);
    return () => window.removeEventListener('cplcdo:reopen-cookie-consent', handleReopen);
  }, []);

  const saveAndClose = (prefs: boolean, stats: boolean) => {
    writeConsent({
      essential: true,
      preferences: prefs,
      analytics: stats,
      decidedAt: new Date().toISOString(),
    });
    setVisible(false);
    setShowManage(false);
  };

  const handleAcceptAll = () => saveAndClose(true, true);
  const handleEssentialOnly = () => saveAndClose(false, false);
  const handleSavePreferences = () => saveAndClose(preferences, analytics);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#025aa7] to-blue-400" />

        <div className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#025aa7]/10 text-[#025aa7] flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-gray-900">We use cookies</h2>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                We use essential cookies to keep the site working, and optional cookies to
                remember your preferences and understand how our online services are used.
                Read our{' '}
                <Link to="/cookies" className="text-[#025aa7] underline underline-offset-2 hover:text-[#024d8f]">
                  Cookie Policy
                </Link>{' '}
                for details.
              </p>
            </div>
          </div>

          {showManage && (
            <div className="mt-5 ml-14 space-y-3">
              <div className="flex items-center justify-between gap-4 p-3.5 bg-gray-50/80 rounded-xl border border-gray-100">
                <div>
                  <div className="text-xs font-semibold text-gray-800">Essential</div>
                  <div className="text-[11px] text-gray-500">Required for sign-in and core features. Always on.</div>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 text-[#025aa7] rounded border-gray-300 opacity-60" />
              </div>

              <div className="flex items-center justify-between gap-4 p-3.5 bg-gray-50/80 rounded-xl border border-gray-100">
                <div>
                  <div className="text-xs font-semibold text-gray-800">Preferences</div>
                  <div className="text-[11px] text-gray-500">Remembers settings like search filters and display options.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences}
                  onChange={(e) => setPreferences(e.target.checked)}
                  className="w-4 h-4 text-[#025aa7] rounded border-gray-300 focus:ring-[#025aa7] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-3.5 bg-gray-50/80 rounded-xl border border-gray-100">
                <div>
                  <div className="text-xs font-semibold text-gray-800">Analytics</div>
                  <div className="text-[11px] text-gray-500">Helps us understand aggregate usage of the site.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-4 h-4 text-[#025aa7] rounded border-gray-300 focus:ring-[#025aa7] cursor-pointer"
                />
              </div>
            </div>
          )}

          <div className="mt-6 ml-14 flex flex-col sm:flex-row gap-2.5">
            {showManage ? (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="flex-1 py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#025aa7]/20 transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#025aa7]/20 transition-all cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={() => setShowManage(true)}
                  className="py-3 px-4 text-[#025aa7] hover:text-[#024d8f] text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Manage
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;