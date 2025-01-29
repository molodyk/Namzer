import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function Banner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="w-full max-w-[728px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5974746752355868"
        data-ad-slot="6745735735"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}