// Socialism on the Blockchain. Theorizing the Web, Museum of the Moving Image (2018).
// No slide file survives. Slides follow the "(slide)" cues in the talk text
// (socialism-blockchain.odt) and use the two images saved for it (edu/talks/TtW);
// the ledger and smart-contract slides are the ones from Beyond Clicktivism (2017).
window.SLIDES = [
  { "kind": "cover", "title": "Socialism on the Blockchain",
    "byline": "Grayson Earle · Theorizing the Web, Museum of the Moving Image, 2018" },
  { "kind": "image", "src": "media/bloc-chain.jpg", "caption": "" },

  // ---- Bail Bloc ----
  { "kind": "image", "src": "media/seti.png",
    "caption": "SETI@home (1999): an application that enlisted latent compute power in volunteers' home computers to create an ad hoc supercomputer" },
  { "kind": "image", "src": "media/bitcoin-2010.jpg",
    "caption": "In 2010, while overseeing a computer lab at my university, I learned about Bitcoin" },
  { "kind": "image", "src": "media/bailbloc-site.png",
    "caption": "Bail Bloc works much like SETI@home; participants can download an application that runs in the background of everyday computer use",
    "link": "https://bailbloc.thenewinquiry.com" },
  { "kind": "image", "src": "media/bailbloc-menu.png",
    "caption": "A coordinated \"mining pool\" gives each machine running Bail Bloc a list of transactions to solve" },
  { "kind": "image", "src": "media/bailbloc-stats.png",
    "caption": "We then trade Monero for US Dollars and cut a check for the entire amount generated to our partners at the Bronx Freedom Fund" },
  { "kind": "image", "src": "media/bff-tweet.png",
    "caption": "On Christmas day, after 5 weeks of the project running, we cut a check for $3333.77 to the Bronx Freedom Fund" },

  // ---- Smart contracts ----
  { "kind": "code", "title": "the bitcoin blockchain", "filename": "a list of transactions", "lang": "js",
    "code": "matt(5.0BTC) -> 1.2BTC -> sarah(1.2BTC)\nsarah(1.2BTC) -> 0.1BTC -> kaz(54.1BTC)\nsteve(3.2BTC) -> ..." },
  { "kind": "code", "title": "Smart Contracts", "lang": "js",
    "code": "if (no_contract && date > May1) then strike\n\nif (avg(menSalary) > avg(womenSalary)) then womenSalary++" },
  { "kind": "text", "title": "What sorts of smart contracts would an international workers party write?",
    "body": [
      "Could we end the wage gap?",
      "Could we pay reparations?",
      "Why is that not a basic assumption of this new financial technology?"
    ] },
  { "kind": "links", "title": "how could a forest buy itself back?", "items": [
    { "label": "terra0.org", "url": "http://www.terra0.org/" }
  ] }
];
