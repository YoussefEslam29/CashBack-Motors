'use client';

import { useEffect } from 'react';
import { branchFromNumber, trackLead, type LeadMethod } from '@/lib/analytics';

/**
 * One listener for the whole site: every click on a WhatsApp (wa.me) or
 * phone (tel:) link is recorded as a lead, with the branch worked out from
 * the number and the bike taken from the link's data-bike attribute.
 * New buttons are tracked automatically — no per-button code needed.
 */
export default function LeadTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute('href') ?? '';
      let method: LeadMethod | null = null;
      let number = '';
      if (href.startsWith('https://wa.me/')) {
        method = 'whatsapp';
        number = href.slice('https://wa.me/'.length).split('?')[0];
      } else if (href.startsWith('tel:')) {
        method = 'call';
        number = href.slice('tel:'.length);
      }
      if (!method) return;

      trackLead({
        method,
        branch: branchFromNumber(number),
        bike: link.dataset.bike,
        page: window.location.pathname,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
