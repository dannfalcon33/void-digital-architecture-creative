import type { ProjectSlug } from '@/types/studio';
import { cn } from '@/lib/cn';

interface ProjectArtworkPlateProps {
  slug: ProjectSlug;
  index: string;
  title: string;
  accentTone: string;
  className?: string;
}

/**
 * Bespoke multi-plane architectural visual plate per project.
 * Zero external network fetches, zero CLS, razor-sharp at any DPI.
 */
export function ProjectArtworkPlate({
  slug,
  index,
  title,
  accentTone,
  className,
}: ProjectArtworkPlateProps) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-void-bg',
        className,
      )}
    >
      {/* Back Plane: Subtle 12-Column Architectural Grid */}
      <div
        aria-hidden="true"
        className="void-grid-blueprint absolute inset-0 opacity-65 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Ambient Depth Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(58% 58% at 50% 48%, ${accentTone}22 0%, rgba(14,14,16,0.5) 55%, rgba(6,6,6,0.92) 100%)`,
        }}
      />

      {/* Mid Plane: Bespoke Geometric Composition per Slug */}
      <div
        aria-hidden="true"
        className="relative z-10 flex h-full w-full items-center justify-center p-[clamp(1.25rem,3vw,3rem)] transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      >
        {slug === 'krono-horology' && (
          <svg
            viewBox="0 0 640 360"
            className="h-full w-full max-w-[92%]"
            fill="none"
          >
            <circle cx="320" cy="180" r="136" stroke="rgba(245,244,240,0.22)" strokeWidth="1" />
            <circle cx="320" cy="180" r="102" stroke="rgba(245,244,240,0.12)" strokeDasharray="3 7" strokeWidth="1" />
            <circle cx="320" cy="180" r="64" stroke={accentTone} strokeOpacity="0.8" strokeWidth="1.25" />
            <circle cx="320" cy="180" r="8" fill={accentTone} />
            <line x1="80" y1="180" x2="560" y2="180" stroke="rgba(245,244,240,0.14)" strokeWidth="1" />
            <line x1="320" y1="24" x2="320" y2="336" stroke="rgba(245,244,240,0.14)" strokeWidth="1" />
            <line x1="320" y1="180" x2="416" y2="108" stroke="#F5F4F0" strokeWidth="1.5" />
            <rect x="488" y="42" width="68" height="24" stroke="rgba(245,244,240,0.22)" strokeWidth="1" />
            <text
              x="522"
              y="58"
              textAnchor="middle"
              fill="rgba(245,244,240,0.68)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="2"
            >
              CAL.01
            </text>
          </svg>
        )}

        {slug === 'atelier-nord' && (
          <svg
            viewBox="0 0 480 600"
            className="h-full w-full max-w-[88%]"
            fill="none"
          >
            <rect x="64" y="68" width="248" height="390" stroke="rgba(245,244,240,0.22)" strokeWidth="1" />
            <rect
              x="148"
              y="148"
              width="256"
              height="384"
              fill="rgba(245,244,240,0.035)"
              stroke="rgba(245,244,240,0.45)"
              strokeWidth="1"
            />
            <line x1="64" y1="296" x2="404" y2="296" stroke="#FF4D2E" strokeOpacity="0.7" strokeWidth="1" />
            <line x1="240" y1="40" x2="240" y2="560" stroke="rgba(245,244,240,0.12)" strokeWidth="1" />
            <rect x="192" y="212" width="168" height="168" stroke="rgba(245,244,240,0.2)" strokeDasharray="4 6" strokeWidth="1" />
            <circle cx="240" cy="296" r="5" fill="#F5F4F0" />
          </svg>
        )}

        {slug === 'monolith-audio' && (
          <svg
            viewBox="0 0 560 420"
            className="h-full w-full max-w-[90%]"
            fill="none"
          >
            {Array.from({ length: 17 }).map((_, i) => {
              const x = 68 + i * 26.5;
              const distFromCenter = Math.abs(8 - i);
              const barHeight = Math.max(36, 250 - distFromCenter * 26);
              const y = 210 - barHeight / 2;
              const isPeak = distFromCenter <= 1;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="6"
                  height={barHeight}
                  fill={isPeak ? accentTone : 'rgba(245,244,240,0.26)'}
                />
              );
            })}
            <line x1="40" y1="210" x2="520" y2="210" stroke="rgba(245,244,240,0.18)" strokeWidth="1" />
            <rect x="44" y="44" width="472" height="332" stroke="rgba(245,244,240,0.12)" strokeWidth="1" />
          </svg>
        )}

        {slug === 'verve-robotics' && (
          <svg
            viewBox="0 0 640 360"
            className="h-full w-full max-w-[92%]"
            fill="none"
          >
            <polygon
              points="320,44 510,180 320,316 130,180"
              stroke="rgba(245,244,240,0.28)"
              strokeWidth="1"
              fill="rgba(245,244,240,0.025)"
            />
            <polygon
              points="320,92 442,180 320,268 198,180"
              stroke="rgba(245,244,240,0.5)"
              strokeWidth="1"
            />
            <line x1="90" y1="180" x2="550" y2="180" stroke="rgba(245,244,240,0.16)" strokeWidth="1" />
            <line x1="320" y1="24" x2="320" y2="336" stroke="rgba(245,244,240,0.16)" strokeWidth="1" />
            <circle cx="320" cy="180" r="14" stroke="#FF4D2E" strokeWidth="1.5" />
            <circle cx="320" cy="180" r="3" fill="#F5F4F0" />
            <circle cx="510" cy="180" r="4" fill="#FF4D2E" />
            <circle cx="130" cy="180" r="4" fill="#F5F4F0" />
          </svg>
        )}
      </div>

      {/* Front Plane: Corner HUD Index & Monograph Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-[clamp(0.85rem,1.6vw,1.35rem)]"
      >
        <span className="type-mono-xs border border-void-border bg-void-bg/75 px-2.5 py-1 text-void-ink backdrop-blur-sm">
          PLATE / {index}
        </span>
        <span className="type-mono-xs text-void-ink-muted">{title}</span>
      </div>

      {/* Bottom Micro Crosshair Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-void-border/60 bg-void-bg/65 px-[clamp(0.85rem,1.6vw,1.35rem)] py-2 backdrop-blur-sm"
      >
        <span className="type-mono-xs text-void-ink-muted">12-COL SPECIMEN</span>
        <span className="type-mono-xs text-void-accent transition-transform duration-300 group-hover:translate-x-1">
          VIEW MONOGRAPH ↗
        </span>
      </div>
    </div>
  );
}
