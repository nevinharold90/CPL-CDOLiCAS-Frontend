import { useEffect } from 'react';

const AdminSiteIdentity = () => {
  useEffect(() => {
    // Change to Admin title + logo
    document.title = 'CDO LiCAS Admin';

    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = '/logo.png';

    // Restore public title + logo when leaving admin
    return () => {
      document.title = 'CDO LiCAS';
      if (link) {
        link.href = '/Licas.png';
      }
    };
  }, []);

  return null; // This component renders nothing
};

export default AdminSiteIdentity;