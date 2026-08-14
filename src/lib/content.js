/**
 * All copy for the site. One file, one swap point.
 * No component under src/components/ contains a hard-coded sentence.
 *
 * ============================ READ THIS ================================
 * Every figure marked [UNVERIFIED] was invented to make the layout
 * complete. They are plausible for a mid-size PTMT unit but they are NOT
 * facts about AquaFlow. Confirm or replace each one before this site is
 * published -- a wrong capacity or dealer count on a B2B site is a
 * credibility problem, not a typo.
 *
 * Deliberately NOT claimed anywhere on this site: ISI marks, BIS licence
 * numbers, ISO certification, patent claims. Add them only when you can
 * supply the certificate number.
 * =======================================================================
 */

export const brand = {
  name: 'AquaFlow',
  full: 'AquaFlow PTMT Industries',
  wordmark: 'AQUAFLOW',
  descriptor: 'PTMT Industries',
  line: 'PTMT bathroom fittings · Ghaziabad',
  phoneDisplay: '+91 98765 43210',
  phoneTel: '+919876543210',
  email: 'info@aquaflowptmt.com',
  city: 'Ghaziabad',
  region: 'Uttar Pradesh',
  address: 'Ghaziabad, Uttar Pradesh, India',
  hours: 'Monday to Saturday, 09:30 – 18:30 IST',
  status: 'Production line running',
}

export const nav = {
  links: [
    { label: 'Capability', href: '#capability' },
    { label: 'Products', href: '#products' },
    { label: 'Process', href: '#process' },
    { label: 'Dealers', href: '#dealers' },
  ],
  cta: 'Become a dealer',
}

export const hero = {
  eyebrow: 'Ghaziabad · Uttar Pradesh · Manufacturing unit',
  line1: 'Fittings that outlast',
  line2: 'the water.',
  body:
    'AquaFlow moulds PTMT bathroom fittings and plumbing accessories for residential and commercial supply. Engineering polymer instead of brass: no corrosion, no plating to flake, no scale bonding to the bore.',
  ctaPrimary: 'Become a dealer',
  ctaSecondary: 'Request the product catalogue',
  scroll: 'Scroll',
  ticker: [
    'PTMT · Poly Tetra Methylene Terephthalate',
    'Corrosion-free by material, not by coating',
    'OEM and private-label moulding',
    'Nationwide dealer distribution',
  ],
}

export const capability = {
  eyebrow: 'Capability',
  heading: 'Three things a buyer',
  headingAccent: 'actually checks.',
  body:
    'Not the brochure adjectives. Whether the tooling is consistent, whether the material holds under pressure, and whether stock reaches your godown when you were told it would.',
  cards: [
    {
      index: '01',
      eyebrow: 'Moulding',
      title: 'One tool, one tolerance',
      body:
        'Dedicated tooling per SKU on injection-moulding presses, with cavity pressure and cycle time held to a fixed window. Batch-to-batch variation is what turns a good sample into a bad consignment.',
      points: [
        'Dedicated tool per SKU, no shared cavities',
        'Cycle logged per batch, traceable to shift',
        'First-off and last-off piece retained',
      ],
    },
    {
      index: '02',
      eyebrow: 'Verification',
      title: 'Tested wet, not on paper',
      body:
        'Sample pieces off every batch are pressure-held, cycled open and shut, and left under prolonged water exposure. PTMT does not corrode — the testing exists to prove the moulding did not introduce a weakness the material would otherwise not have.',
      points: [
        'Pressure hold on sampled bodies',
        'Spindle cycled to a fixed count',
        'Prolonged wet exposure, checked for seepage',
      ],
    },
    {
      index: '03',
      eyebrow: 'Dispatch',
      title: 'Stock that actually moves',
      body:
        'Standing SKUs held in finished-goods stock so a dealer order does not wait on a production slot. Mixed-carton dispatch for retail counters, full-load dispatch for distributors.',
      points: [
        'Standing SKUs held in ready stock',
        'Mixed cartons for counter replenishment',
        'Transport documentation with every dispatch',
      ],
    },
  ],
}

/* [UNVERIFIED] — every number in this block is invented. */
export const metrics = {
  eyebrow: 'By the numbers',
  heading: 'What the unit runs at.',
  items: [
    {
      label: 'Monthly capacity',
      value: 120000,
      suffix: 'K',
      divisor: 1000,
      unit: 'pieces per month',
      body: 'Installed moulding capacity across the standing product range, running a two-shift pattern.',
    },
    {
      label: 'Active catalogue',
      value: 84,
      suffix: '',
      unit: 'SKUs in production',
      body: 'Across eight product families, from bib cocks and angle valves through to kitchen fittings and accessories.',
    },
    {
      label: 'Distribution',
      value: 19,
      suffix: '',
      unit: 'states served',
      body: 'Dealer and distributor network covering north, west and central India, with transport partners for the rest.',
    },
  ],
  footnote:
    'Figures reflect installed capacity and current catalogue. Ask for the current stock statement before placing a first order.',
}

export const products = {
  eyebrow: 'Product range',
  heading: 'Eight families,',
  headingAccent: 'one material.',
  body:
    'Everything below is moulded in PTMT. Finishes, pack sizes and carton quantities are listed in the dealer catalogue — request it and it comes by email the same working day.',
  cta: 'Request the full catalogue',
  items: [
    {
      icon: 'Droplets',
      name: 'PTMT taps',
      body: 'Pillar cocks, sink taps and long-body taps across the standard bore sizes.',
      tag: 'Core range',
    },
    {
      icon: 'Wrench',
      name: 'Bib cocks',
      body: 'Wall-mounted bib cocks with and without flange, in short and long nose.',
      tag: 'Core range',
    },
    {
      icon: 'Gauge',
      name: 'Angle valves',
      body: 'Quarter-turn and multi-turn angle valves for cistern and geyser feed.',
      tag: 'Core range',
    },
    {
      icon: 'ShowerHead',
      name: 'Health faucets',
      body: 'Faucet head, flexible tube and wall hook supplied as a complete set.',
      tag: 'Set',
    },
    {
      icon: 'CloudRain',
      name: 'Showers',
      body: 'Overhead and telephonic showers with anti-clog nozzle faces.',
      tag: 'Core range',
    },
    {
      icon: 'Cable',
      name: 'Connection pipes',
      body: 'Braided and PVC connection pipes in the common lengths, with PTMT nuts.',
      tag: 'Consumable',
    },
    {
      icon: 'Bath',
      name: 'Bathroom accessories',
      body: 'Soap dishes, towel rods, hooks, brush holders and mounting hardware.',
      tag: 'Accessory',
    },
    {
      icon: 'ChefHat',
      name: 'Kitchen fittings',
      body: 'Sink cocks, swan-neck taps and kitchen-specific spouts and adaptors.',
      tag: 'Core range',
    },
  ],
}

export const process = {
  eyebrow: 'Process',
  heading: 'Compound to carton,',
  headingAccent: 'four stages.',
  steps: [
    {
      no: '01',
      eyebrow: 'Material',
      title: 'The compound is checked before it is melted',
      body:
        'PTMT granules are received against specification and checked for moisture before drying. Wet granule is the single most common cause of a weak moulded body, and it cannot be corrected downstream.',
      points: ['Incoming lot recorded against supplier', 'Moisture checked before drying', 'Regrind ratio held to a fixed ceiling'],
      media: 'IMG-PROCESS-01',
    },
    {
      no: '02',
      eyebrow: 'Moulding',
      title: 'Presses run to a fixed window, not to feel',
      body:
        'Each SKU has its own tool and its own parameter sheet — barrel profile, injection pressure, cooling time. Operators run to the sheet, and the sheet changes only with sign-off.',
      points: ['Parameter sheet locked per tool', 'Cycle time logged per batch', 'Tool maintenance on a shot-count schedule'],
      media: 'IMG-PROCESS-02',
    },
    {
      no: '03',
      eyebrow: 'Testing',
      title: 'Wet testing on sampled pieces',
      body:
        'Assembled bodies are pressure-held and cycled. The spindle, the washer seat and the thread are where a fitting fails in service, so those are what get loaded.',
      points: ['Pressure hold with visual seepage check', 'Spindle cycled to a fixed count', 'Thread gauged for fit'],
      media: 'IMG-PROCESS-03',
    },
    {
      no: '04',
      eyebrow: 'Dispatch',
      title: 'Packed to survive the transport, not the shelf',
      body:
        'Individually bagged, cartoned by SKU or mixed to order, and marked so a counter can read the carton without opening it. Damage in transit is a dealer’s problem long before it is a customer’s.',
      points: ['Mixed or single-SKU cartons', 'Carton marked with SKU and quantity', 'Dispatch documentation with every load'],
      media: 'IMG-PROCESS-04',
    },
  ],
}

export const services = {
  eyebrow: 'What we do',
  heading: 'Manufacturing, and everything',
  headingAccent: 'that has to work around it.',
  items: [
    {
      icon: 'Factory',
      title: 'Product manufacturing',
      body: 'The standing AquaFlow catalogue, moulded in-house on dedicated tooling and held in finished-goods stock.',
    },
    {
      icon: 'Boxes',
      title: 'OEM manufacturing',
      body: 'Your brand, your carton, our tooling and line. Supplied unbranded or fully private-labelled to your artwork.',
    },
    {
      icon: 'Truck',
      title: 'Bulk supply',
      body: 'Full-load and part-load supply for distributors and project buyers, quoted against a schedule rather than a single order.',
    },
    {
      icon: 'Handshake',
      title: 'Dealer support',
      body: 'Territory-wise appointment, counter display material, replacement handling and a named person to call.',
    },
    {
      icon: 'Settings2',
      title: 'Product customization',
      body: 'Changes to length, bore, handle form or pack configuration where volume justifies a tooling change.',
    },
    {
      icon: 'MapPinned',
      title: 'Nationwide distribution',
      body: 'Transport partners and a dispatch desk that works to your godown timings, not ours.',
    },
  ],
}

export const trust = {
  eyebrow: 'Why buyers stay',
  items: [
    {
      icon: 'Cpu',
      title: 'Advanced manufacturing',
      body: 'Injection moulding on dedicated per-SKU tooling, with parameters locked to a sheet and logged per batch.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Quality-tested products',
      body: 'Pressure, cycling and prolonged wet exposure on sampled pieces from every production batch.',
    },
    {
      icon: 'Network',
      title: 'Wide distribution network',
      body: 'An established dealer and distributor network with stock held ready rather than made to order.',
    },
  ],
}

export const dealers = {
  eyebrow: 'Dealer enquiry',
  heading: 'Open territories,',
  headingAccent: 'and honest ones.',
  body:
    'We appoint by territory and we tell you if yours is already covered. Fill this in and you will get a margin structure, the current stock statement and the catalogue — not a brochure and a follow-up call.',
  points: [
    'Territory-wise appointment with written terms',
    'Margin structure shared before you commit',
    'Counter display material and product training',
    'A named person at the unit, not a call centre',
  ],
  businessTypes: ['Dealer', 'Distributor', 'Builder', 'Contractor', 'Retailer', 'Hardware store'],
  volumes: ['Under ₹1 lakh', '₹1–5 lakh', '₹5–15 lakh', 'Above ₹15 lakh', 'Not sure yet'],
  submit: 'Submit dealer enquiry',
  sending: 'Sending',
  sentTitle: 'Enquiry received.',
  sentBody:
    'A response with margin structure and the current stock statement follows within one working day. If it is urgent, call the unit directly.',
}

export const contact = {
  eyebrow: 'Contact',
  heading: 'Talk to the unit',
  headingAccent: 'directly.',
  body:
    'For anything that is not a dealer enquiry — OEM briefs, drawings, customization questions, transport queries, or a complaint.',
  security:
    'What you send is used to answer your enquiry and nothing else. No lists, no resale.',
  submit: 'Send enquiry',
  sending: 'Sending',
  sentTitle: 'Message sent.',
  sentBody: 'You will have a reply within one working day.',
  upload: {
    title: 'Attach drawings or reference images',
    hint: 'Up to 5 files · JPG, PNG or PDF',
  },
}

export const footer = {
  tagline: 'Fittings that outlast',
  taglineAccent: 'the water.',
  columns: [
    {
      title: 'Products',
      links: ['PTMT taps', 'Bib cocks', 'Angle valves', 'Health faucets', 'Showers', 'Connection pipes'],
    },
    {
      title: 'Company',
      links: ['Capability', 'Process', 'Dealer enquiry', 'Contact'],
    },
  ],
  legalNote: 'PTMT — Poly Tetra Methylene Terephthalate.',
}

export const legal = {
  Privacy: [
    'We collect only what you type into the enquiry forms on this site: your name, firm, contact details, territory and whatever you write in the message field. Attachments you upload are held with the enquiry.',
    'That information is used to answer your enquiry and to service the account if one is opened. It is not sold, rented or shared with third parties for their own marketing.',
    'Write to info@aquaflowptmt.com to ask what we hold about you or to have it removed. We will act on it within thirty days.',
  ],
  Terms: [
    'Prices are quoted in writing against a specific schedule and hold for the period stated on the quotation. Raw material movement beyond that period is passed through at cost, shown to you before dispatch continues.',
    'Dealer appointment is territory-wise and is confirmed in writing. Margin structure, credit terms and stock commitments form part of that written appointment and not of this website.',
    'Manufacturing defect is replaced. Damage from incorrect installation, incompatible line pressure or transit handling outside our dispatch is assessed case by case.',
  ],
}
