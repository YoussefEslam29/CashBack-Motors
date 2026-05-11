import { Phone, MessageCircle } from 'lucide-react';
import { LOCATIONS, SOCIAL_LINKS, type BranchKey } from '@/lib/constants';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

interface ContactInfoProps {
  branchLabel: (branch: BranchKey) => string;
  callLabel: string;
  whatsappLabel: string;
  followLabel: string;
}

export default function ContactInfo({
  branchLabel,
  callLabel,
  whatsappLabel,
  followLabel,
}: ContactInfoProps) {
  const socialLinks = [
    { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
    { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: FaTiktok, href: SOCIAL_LINKS.tiktok, label: 'TikTok' },
  ];

  const branches: BranchKey[] = ['cairo', 'alexandria'];

  return (
    <div className="space-y-6">
      {branches.map((branch) => {
        const loc = LOCATIONS[branch];
        return (
          <div
            key={branch}
            className="bg-bg-surface border border-border rounded-lg p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-text-primary">
              {branchLabel(branch)}
            </h3>
            <a
              href={`tel:${loc.phone}`}
              className="flex items-center gap-4 p-3 bg-bg-elevated rounded-lg border border-border hover:border-primary transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-text-muted">{callLabel}</p>
                <p className="text-text-primary font-medium">{loc.phone}</p>
              </div>
            </a>
            <a
              href={buildWhatsAppLink(branch)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 bg-bg-elevated rounded-lg border border-border hover:border-[#25D366] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <div>
                <p className="text-xs text-text-muted">{whatsappLabel}</p>
                <p className="text-text-primary font-medium">{loc.phone}</p>
              </div>
            </a>
          </div>
        );
      })}

      {/* Social */}
      <div className="bg-bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">
          {followLabel}
        </h3>
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-11 h-11 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
