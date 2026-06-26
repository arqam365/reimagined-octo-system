'use client'

import { useEffect, useState } from 'react'

// Pre-computed at module level so server and client produce identical values
const SLICES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * 60 * Math.PI) / 180
  return {
    x2: parseFloat((60 + 52 * Math.cos(angle)).toFixed(3)),
    y2: parseFloat((60 + 52 * Math.sin(angle)).toFixed(3)),
  }
})

export default function SiteLoader() {
  const [visible,  setVisible]  = useState(true)
  const [fadeOut,  setFadeOut]  = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true),  2200)
    const t2 = setTimeout(() => setVisible(false),  2900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  const toppings = [
    { cx: 75, cy: 41, r: 5.5, fill: '#CC2229', delay: '1.4s' },
    { cx: 44, cy: 47, r: 4.5, fill: '#CC2229', delay: '1.5s' },
    { cx: 73, cy: 76, r: 5,   fill: '#CC2229', delay: '1.55s' },
    { cx: 47, cy: 73, r: 4,   fill: '#2D5A1B', delay: '1.6s' },
    { cx: 63, cy: 51, r: 3.5, fill: '#2D5A1B', delay: '1.65s' },
    { cx: 60, cy: 38, r: 3,   fill: '#2D5A1B', delay: '1.7s' },
  ]

  return (
    <>
      <style>{`
        @keyframes mz-crust {
          to { stroke-dashoffset: 0; }
        }
        @keyframes mz-slice {
          to { stroke-dashoffset: 0; }
        }
        @keyframes mz-topping {
          0%   { opacity: 0; transform: scale(0.3); }
          70%  { opacity: 0.9; transform: scale(1.15); }
          100% { opacity: 0.85; transform: scale(1); }
        }
        @keyframes mz-word {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes mz-sub {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        .mz-crust {
          stroke-dasharray: 345;
          stroke-dashoffset: 345;
          transform-box: fill-box;
          transform-origin: center;
          transform: rotate(-90deg);
          animation: mz-crust 1s cubic-bezier(0.4,0,0.2,1) 0.1s forwards;
        }
        .mz-slice {
          stroke-dasharray: 55;
          stroke-dashoffset: 55;
          animation: mz-slice 0.25s ease-out forwards;
        }
        .mz-topping {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: mz-topping 0.3s ease-out forwards;
        }
        .mz-word {
          opacity: 0;
          animation: mz-word 0.6s ease-out forwards;
        }
        .mz-sub {
          opacity: 0;
          animation: mz-sub 0.6s ease-out 1.45s forwards;
        }
      `}</style>

      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0806]"
        style={{ transition: 'opacity 0.7s ease', opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? 'none' : 'auto' }}
      >
        {/* Pizza SVG */}
        <div className="w-28 h-28 mb-8">
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
            {/* Sauce base */}
            <circle cx="60" cy="60" r="52" fill="#1C0D07" />

            {/* Cheese layer */}
            <circle cx="60" cy="60" r="50" fill="#C8882A" opacity="0.18" />

            {/* Crust ring — draws itself */}
            <circle
              cx="60" cy="60" r="55"
              fill="none"
              stroke="#8B6418"
              strokeWidth="9"
              strokeLinecap="round"
              className="mz-crust"
            />

            {/* Inner crust edge */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="#5C3D10" strokeWidth="1" opacity="0.4" />

            {/* Slice cuts */}
            {SLICES.map((s, i) => (
              <line
                key={i}
                x1="60" y1="60"
                x2={s.x2} y2={s.y2}
                stroke="#0A0806"
                strokeWidth="1.8"
                className="mz-slice"
                style={{ animationDelay: `${1.1 + i * 0.055}s` }}
              />
            ))}

            {/* Toppings */}
            {toppings.map((t, i) => (
              <circle
                key={i}
                cx={t.cx} cy={t.cy} r={t.r}
                fill={t.fill}
                className="mz-topping"
                style={{ animationDelay: t.delay }}
              />
            ))}
          </svg>
        </div>

        {/* Wordmark */}
        <p
          className="mz-word text-white tracking-[0.55em] uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.1rem',
            letterSpacing: '0.55em',
            animationDelay: '1.1s',
          }}
        >
          Mazencito
        </p>
        <p className="mz-sub text-white/25 text-[11px] font-mono tracking-[0.35em] mt-1.5">
          مازنشيتو
        </p>

        {/* Italian tricolor — bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[3px]">
          <div className="flex-1 bg-[#009246]" />
          <div className="flex-1 bg-white/80" />
          <div className="flex-1 bg-[#CC2229]" />
        </div>
      </div>
    </>
  )
}
