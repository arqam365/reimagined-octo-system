'use client'

import Image from 'next/image'

const dishes = [
  { src: '/food-margherita.jpg',        label: 'Pizza Margherita',              cat: 'Pizza'    },
  { src: '/food-fettuccine.jpg',        label: 'Fettuccine ai Funghi',          cat: 'Pasta'    },
  { src: '/food-spaghetti-seafood.jpg', label: 'Spaghetti ai Frutti di Mare',   cat: 'Pasta'    },
  { src: '/food-pasta-baked.jpg',       label: 'Pasta al Forno',                cat: 'Pasta'    },
  { src: '/food-fritto-misto.jpg',      label: 'Fritto Misto',                  cat: 'Starters' },
  { src: '/food-spaghetti-shrimp.jpg',  label: 'Spaghetti al Limone e Gamberi', cat: 'Pasta'    },
  { src: '/food-schnitzel.jpg',         label: 'Cotoletta alla Milanese',        cat: 'Mains'    },
  { src: '/food-mini-pizzas.jpg',       label: 'Pizzette Assortite',             cat: 'Pizza'    },
]

export default function FoodMarquee() {
  const doubled = [...dishes, ...dishes]

  return (
    <div className="bg-[#0A0806] py-5 overflow-hidden select-none">
      <div
        className="flex gap-3 animate-marquee-ltr will-change-transform hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {doubled.map((dish, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{ width: 340, height: 220 }}
          >
            <Image
              src={dish.src}
              alt={dish.label}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="340px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/50 mb-0.5">{dish.cat}</p>
              <p className="font-ui text-xs font-medium text-white/90 leading-tight">{dish.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
