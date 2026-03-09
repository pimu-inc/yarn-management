type Props = {
  quantity: number;
};

// 毛糸玉アイコン（塗りつぶし）
function FilledBall() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-pink-400" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2c-2.5 3.5-4 7-4 10s1.5 6.5 4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <path d="M12 2c2.5 3.5 4 7 4 10s-1.5 6.5-4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

// 毛糸玉アイコン（半分）
function HalfBall() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
      <defs>
        <linearGradient id="half" x1="0" y1="0" x2="0" y2="1">
          <stop offset="50%" stopColor="#e5e7eb" />
          <stop offset="50%" stopColor="#f9a8d4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#half)" />
      <path d="M12 2c-2.5 3.5-4 7-4 10s1.5 6.5 4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <path d="M12 2c2.5 3.5 4 7 4 10s-1.5 6.5-4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

// 毛糸玉アイコン（ほぼ空）
function NearlyEmptyBall() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
      <defs>
        <linearGradient id="nearly-empty" x1="0" y1="0" x2="0" y2="1">
          <stop offset="80%" stopColor="#e5e7eb" />
          <stop offset="80%" stopColor="#f9a8d4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#nearly-empty)" />
      <path d="M12 2c-2.5 3.5-4 7-4 10s1.5 6.5 4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <path d="M12 2c2.5 3.5 4 7 4 10s-1.5 6.5-4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

// 毛糸玉アイコン（空）
function EmptyBall() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 2c-2.5 3.5-4 7-4 10s1.5 6.5 4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <path d="M12 2c2.5 3.5 4 7 4 10s-1.5 6.5-4 10" fill="none" stroke="white" strokeWidth="1.2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

export function QuantityIcon({ quantity }: Props) {
  if (quantity <= 0) {
    return (
      <div className="flex items-center gap-0.5">
        <EmptyBall />
      </div>
    );
  }

  if (quantity < 0.5) {
    return (
      <div className="flex items-center gap-0.5">
        <NearlyEmptyBall />
      </div>
    );
  }

  if (quantity < 1) {
    return (
      <div className="flex items-center gap-0.5">
        <HalfBall />
      </div>
    );
  }

  const fullBalls = Math.floor(quantity);
  const hasHalf = quantity % 1 >= 0.5;
  const displayCount = Math.min(fullBalls, 5);

  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {Array.from({ length: displayCount }).map((_, i) => (
        <FilledBall key={i} />
      ))}
      {hasHalf && fullBalls < 5 && <HalfBall />}
      {fullBalls > 5 && (
        <span className="text-xs text-gray-500 font-medium ml-0.5">
          +{fullBalls - 5}
        </span>
      )}
    </div>
  );
}
