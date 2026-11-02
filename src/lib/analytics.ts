import { track } from '@vercel/analytics';
import { LOCATIONS, BRANCHES, type BranchKey } from './constants';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type LeadMethod = 'whatsapp' | 'call';

export interface LeadEvent {
  method: LeadMethod;
  branch: BranchKey | 'unknown';
  /** Bike slug when the click came from a bike card or bike page. */
  bike?: string;
  /** Page path where the click happened. */
  page: string;
}

const lastTen = (value: string) => value.replace(/\D/g, '').slice(-10);

/** Works out which branch a wa.me or tel: link points to, from its number. */
export function branchFromNumber(raw: string): BranchKey | 'unknown' {
  const digits = lastTen(raw);
  const match = BRANCHES.find((key) => lastTen(LOCATIONS[key].whatsapp) === digits);
  return match ?? 'unknown';
}

/**
 * Sends one "lead" event to every analytics tool that is switched on:
 * GA4 (`generate_lead`), Meta Pixel (`Contact`) and Vercel Analytics (`lead`).
 */
export function trackLead(event: LeadEvent): void {
  const params = {
    method: event.method,
    branch: event.branch,
    bike: event.bike ?? 'none',
    page: event.page,
  };
  try {
    window.gtag?.('event', 'generate_lead', params);
    window.fbq?.('track', 'Contact', {
      content_name: params.bike,
      branch: params.branch,
      method: params.method,
    });
    track('lead', params);
  } catch {
    // Analytics must never break a customer's click.
  }
}
