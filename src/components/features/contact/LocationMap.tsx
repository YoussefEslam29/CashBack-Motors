import { MapPin, Navigation } from 'lucide-react';
import { LOCATIONS, type BranchKey } from '@/lib/constants';

interface LocationMapProps {
  branch: BranchKey;
  label: string;
  directionsLabel: string;
}

export default function LocationMap({ branch, label, directionsLabel }: LocationMapProps) {
  const location = LOCATIONS[branch];

  return (
    <div className="bg-bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">{label}</h3>
          </div>
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-all duration-300"
          >
            <Navigation className="w-4 h-4" />
            {directionsLabel}
          </a>
        </div>
      </div>
      <div className="h-64">
        <iframe
          src={location.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={label}
        />
      </div>
    </div>
  );
}
