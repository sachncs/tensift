import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 28, showWordmark = true, className = '' }: LogoProps) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="tensift — home"
    >
      <span
        className="relative inline-flex items-center justify-center rounded-xl"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          aria-hidden="true"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B1916" />
              <stop offset="100%" stopColor="#11100E" />
            </linearGradient>
            <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e89148" />
              <stop offset="100%" stopColor="#A14A14" />
            </linearGradient>
          </defs>
          <rect
            width="64"
            height="64"
            rx="14"
            fill="url(#logoBg)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.6"
          />
          <g
            transform="translate(32 30)"
            fill="none"
            stroke="url(#logoAccent)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          >
            <polygon points="-15,0  -7.5,-13   7.5,-13   15,0  7.5,13  -7.5,13" />
            <line x1="-12" y1="-10.4" x2="12" y2="10.4" opacity="0.65" />
            <circle cx="0" cy="0" r="1" fill="url(#logoAccent)" stroke="none" />
            <line x1="0" y1="0" x2="-9" y2="-7.8" />
            <line x1="0" y1="0" x2="9"  y2="-7.8" />
          </g>
        </svg>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: '0 0 28px -4px rgba(214, 120, 41, 0.55), inset 0 0 0 1px rgba(214,120,41,0.4)',
          }}
        />
      </span>
      {showWordmark && (
        <span className="font-display text-[1.05rem] leading-none tracking-tight text-ink-50">
          tensift
        </span>
      )}
    </a>
  );
}