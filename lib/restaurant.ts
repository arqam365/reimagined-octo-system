// Single source of truth for public business facts.
// Values mirror https://mazencito.com (checked 2026-11-05). Restaurant must approve any change.

export const restaurant = {
  addressLines: ['King Abdulaziz Branch Road', 'Jeddah, Saudi Arabia'],
  addressOneLine: 'King Abdulaziz Branch Road, Jeddah',
  hours: '1:00 PM – 1:00 AM',
  hoursShort: '1PM – 1AM',
  // Phones are for table reservations only. No phone/WhatsApp orders.
  phones: [
    { tel: '+966555674383', display: '+966 55 567 4383' },
    { tel: '+966554430556', display: '+966 55 443 0556' },
  ],
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Mazencito+Pizzeria+King+Abdulaziz+Branch+Road+Jeddah',
  instagram: 'https://www.instagram.com/mazencito.ksa',
  google: { rating: '4.5', count: '2,273' },
  delivery: [
    { name: 'HungerStation', url: 'https://hungerstation.com/sa-en/restaurant/mazencito-pizzeria/jeddah/az-zahra/49925' },
    { name: 'Keeta', url: 'https://url.mykeeta.com/H6i6jrAz' },
    { name: 'Jahez', url: 'https://jahez.link/meo7qpWgYgb' },
    { name: 'Lugmety', url: 'https://intranet.lugmety.com/deeplink.php?rid=1443' },
  ],
} as const
