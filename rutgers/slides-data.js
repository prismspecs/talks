// Beyond Clicktivism: hacking social structures. Rutgers University (2017).
// Ported from the original scrolling HTML deck (edu/talks/rutgers/index.html). Slides that
// stacked several images are split one image per slide; all text is from the original.
window.SLIDES = [
  { "kind": "cover", "title": "Beyond Clicktivism", "subtitle": "hacking social structures" },

  // ---- Free Toilet ----
  { "kind": "section", "title": "Where do you pee in NYC?" },
  { "kind": "image", "src": "media/free-toilet.jpg",
    "caption": "Free Toilet NYC", "link": "http://cargocollective.com/graysonearle/Toilet-Liberation-Front" },

  // ---- White Collar Crime ----
  { "kind": "links", "title": "what kinds of crime do we concern ourselves with?", "items": [
    { "label": "White Collar Crime Map", "url": "https://whitecollar.thenewinquiry.com" }
  ] },

  // ---- OWS ----
  { "kind": "image", "src": "media/adbusters-ows.jpg", "caption": "OWS" },
  { "kind": "section", "title": "what are our demands?" },

  // ---- The Illuminator ----
  { "kind": "section", "title": "what if ows had a bat signal?" },
  { "kind": "textimg", "src": "media/illuminator-van.jpg", "title": "The Illuminator",
    "body": [
      "political art collective w 9 members",
      "a van with a powerful projector, or tactical media machine capable of generating spectacles"
    ] },
  { "kind": "image", "src": "media/montreal-pd.jpg",
    "caption": "\"police everywhere, justice nowhere\"; montreal pd" },
  { "kind": "image", "src": "media/cooper-union.jpg", "caption": "cooper union, 2012" },
  { "kind": "image", "src": "media/dontshoot.jpg", "caption": "#dontshoot" },
  { "kind": "image", "src": "media/jfk-2017.jpg", "caption": "jfk, 2017" },
  { "kind": "links", "items": [
    { "label": "theilluminator.org", "url": "http://theilluminator.org" }
  ] },

  // ---- Montreal ----
  { "kind": "image", "src": "media/montreal.jpg",
    "caption": "Montreal (300,000 people in the streets of montreal)" },
  { "kind": "image", "src": "media/montreal-finger-map.jpg", "caption": "" },
  { "kind": "image", "src": "media/montreal-greenscreen-1.jpg", "caption": "" },
  { "kind": "image", "src": "media/montreal-greenscreen-2.jpg", "caption": "" },
  { "kind": "video", "src": "https://player.vimeo.com/video/110535506?dnt=1&title=0&byline=0&portrait=0",
    "caption": "what if we could circumvent anti-protest laws w technology?" },

  // ---- Snowden ----
  { "kind": "section", "title": "who should we be honoring w monuments?" },
  { "kind": "video", "src": "https://www.youtube-nocookie.com/embed/n7rAhEpft5g?rel=0",
    "caption": "Snowden" },
  { "kind": "image", "src": "media/snowden-takedown.jpg", "caption": "" },
  { "kind": "quote", "quote": "Absence is Presence with Distance", "attribution": "Taeyoon Choi" },
  { "kind": "image", "src": "media/snowden-1.jpg", "caption": "" },
  { "kind": "image", "src": "media/snowden-2.jpg", "caption": "" },
  { "kind": "image", "src": "media/snowden-3.jpg", "caption": "" },

  // ---- NSA Haiku / NSA Game ----
  { "kind": "links", "title": "NSA Haiku", "items": [
    { "label": "nsahaiku.net", "url": "http://nsahaiku.net" }
  ] },
  { "kind": "links", "title": "Terrorist Threat or Harmless Phrase?", "items": [
    { "label": "nsagame.net", "url": "http://nsagame.net" }
  ] },

  // ---- Bitcoin ----
  { "kind": "section", "title": "what would money be like without banks?" },
  { "kind": "image", "src": "media/understand-bitcoin.jpg", "caption": "Bitcoin" },
  { "kind": "image", "src": "media/bitcoin-chart.png",
    "caption": "in 2010, one bitcoin was worth pennies, now $7,000+" },
  { "kind": "section", "title": "no really, wtf is Bitcoin?", "sub": "a blockchain" },
  { "kind": "section", "title": "wtf is blockchain", "sub": "a ledger" },
  { "kind": "code", "title": "wtf is this ledger", "filename": "a list of transactions", "lang": "js",
    "code": "matt(5.0BTC) -> 1.2BTC -> sarah(1.2BTC)\nsarah(1.2BTC) -> 0.1BTC -> kaz(54.1BTC)\nsteve(3.2BTC) -> ..." },

  // ---- Bail Bloc ----
  { "kind": "image", "src": "media/seti.jpg", "caption": "SETI @ Home" },
  { "kind": "section", "title": "what if clicktivism actually did something?" },
  { "kind": "quote",
    "quoteHtml": "what if we used distributed <s>bitcoin</s> cryptocurrency mining to finance radical projects?" },
  { "kind": "links", "items": [
    { "label": "bailbloc.thenewinquiry.com", "url": "https://bailbloc.thenewinquiry.com/" }
  ] },

  // ---- What's next ----
  { "kind": "section", "title": "What's next?" },
  { "kind": "code", "title": "Smart Contracts", "lang": "js",
    "code": "if (no_contract && date > May1) then strike\n\nif (avg(menSalary) > avg(womenSalary)) then womenSalary++" },
  { "kind": "links", "title": "how could a forest buy itself back?", "items": [
    { "label": "terra0.org", "url": "http://www.terra0.org/" }
  ] },
  { "kind": "links", "items": [
    { "label": "graysonearle.com", "url": "https://graysonearle.com" }
  ] }
];
