declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export const trackEvent = (
  eventName: string,
  eventParams?: EventParams
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  try {
    // Ensure all values are serializable
    const cleanParams = eventParams ? JSON.parse(JSON.stringify(eventParams)) : undefined;
    window.gtag('event', eventName, cleanParams);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};