import Image from 'next/image';

type Platform = 'polymarket' | 'kalshi' | 'limitless' | 'discovery' | 'quantish';

interface PlatformLogoProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const logoMap: Record<Platform, { src: string; alt: string; bgColor: string }> = {
  polymarket: {
    src: '/polymarket-logo.svg',
    alt: 'Polymarket',
    bgColor: '#6047FF',
  },
  kalshi: {
    src: '/kalshi-logo.svg',
    alt: 'Kalshi',
    bgColor: '#1DB954',
  },
  limitless: {
    src: '/limitless-logo.svg',
    alt: 'Limitless',
    bgColor: '#FF6B35',
  },
  discovery: {
    src: '/quantish-logo.svg',
    alt: 'Discovery',
    bgColor: '#2E5CFF',
  },
  quantish: {
    src: '/quantish-logo.svg',
    alt: 'Quantish',
    bgColor: '#2E5CFF',
  },
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function PlatformLogo({ platform, size = 'md', className = '' }: PlatformLogoProps) {
  const logo = logoMap[platform];
  const dimension = sizeMap[size];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={dimension}
      height={dimension}
      className={`rounded-sm ${className}`}
    />
  );
}

export function PlatformIcon({ platform, size = 'md' }: { platform: Platform; size?: 'sm' | 'md' | 'lg' }) {
  const logo = logoMap[platform];
  const dimension = sizeMap[size];

  return (
    <div
      className="flex items-center justify-center rounded-md shrink-0"
      style={{
        width: dimension + 8,
        height: dimension + 8,
        background: logo.bgColor,
      }}
    >
      <PlatformLogo platform={platform} size={size} />
    </div>
  );
}

export function getPlatformFromCategory(category: string): Platform {
  if (category === 'polymarket') return 'polymarket';
  if (category === 'kalshi') return 'kalshi';
  if (category === 'limitless') return 'limitless';
  if (category === 'markets' || category === 'wallets') return 'discovery';
  return 'quantish';
}
