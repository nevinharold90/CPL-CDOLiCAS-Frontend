// src/pages/Maintenance.tsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Maintenance = () => {
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false);

  // Show SweetAlert notice immediately when page loads
  useEffect(() => {
    Swal.fire({
      title: 'Maintenance Mode',
      text: 'This page is used to put the website under maintenance or bring it back online. Only use when performing system updates or fixes.',
      icon: 'info',
      confirmButtonText: 'Got it',
      confirmButtonColor: '#6366f1',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }, []);

  const handleToggleMaintenance = () => {
    Swal.fire({
      title: isUnderMaintenance ? 'End Maintenance?' : 'Start Maintenance?',
      text: isUnderMaintenance
        ? 'The website will become accessible to users again.'
        : 'The public website will be temporarily shut down and show a maintenance page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isUnderMaintenance ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: isUnderMaintenance ? 'Yes, Restore Site' : 'Yes, Shut Down',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsUnderMaintenance(!isUnderMaintenance);
        
        Swal.fire({
          title: isUnderMaintenance ? 'Website Restored' : 'Maintenance Active',
          text: isUnderMaintenance
            ? 'The public site is now back online.'
            : 'The website is now in maintenance mode.',
          icon: isUnderMaintenance ? 'success' : 'info',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
      <div className="p-6 md:p-8 lg:p-8 min-h-screen bg-linear-to-b from-zinc-50 to-white font-[Poppins]">
        {/* Header at top */}
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-10">
          Website Maintenance Control
        </h1>

        {/* Centered content */}
        <div className="flex items-center justify-center h-[calc(100vh-180px)]">
          <div className="text-center flex flex-col items-center gap-8 max-w-3xl w-full">
            <p className="text-zinc-500 text-base max-w-xl mx-auto">
              Use this page only when you need to take the public-facing website offline for updates, fixes, or server maintenance.
            </p>

            <button
              onClick={handleToggleMaintenance}
              className={`
                px-16 py-10 text-3xl md:text-4xl font-extrabold rounded-xl shadow-2xl transition-all duration-300 transform
                ${isUnderMaintenance 
                  ? 'bg-green-700 hover:bg-green-600 text-white' 
                  : 'bg-red-700 hover:bg-red-600 text-white'}
                hover:scale-105 active:scale-95
                focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-red-500/50 cursor-pointer
              `}
            >
              {isUnderMaintenance 
                ? 'END MAINTENANCE – Restore Website' 
                : 'SHUTDOWN WEBSITE – Start Maintenance'}
            </button>

            <div>
              <p className="text-lg text-zinc-700">
                Current status:{' '}
                <span 
                  className={`font-bold ${
                    isUnderMaintenance 
                      ? 'text-red-600'      // RED when under maintenance (offline)
                      : 'text-green-600'    // GREEN when online
                  }`}
                >
                  {isUnderMaintenance ? 'UNDER MAINTENANCE' : 'ONLINE'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Maintenance;