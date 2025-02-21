// utils/referral.ts
export function getReferrerFromURL(): string | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('referrer');
  }