// Software for Artists: The Counter-Productivity Suite. Pioneer Works (2020).
// No slide file survives (the original was a Google Slides deck). This follows the talk
// script (talks/s4a/script.md) in order: one slide per IMAGE / SCREENSHOTS cue, with
// captions and text taken from the script itself.
window.SLIDES = [
  { "kind": "cover", "title": "Software for Artists",
    "subtitle": "The Counter-Productivity Suite",
    "byline": "Grayson Earle · Pioneer Works, 2020" },

  // ---- GTA V ----
  { "kind": "image", "src": "media/cops-screenshot.jpg",
    "caption": "Live scripting Grand Theft Auto V (content warning: simulated violence)" },
  { "kind": "image", "src": "media/cops-coding.jpg",
    "caption": "One of the first things I tried was to make the police fight each other" },
  { "kind": "image", "src": "media/cops-forums.jpg",
    "caption": "I've even tried asking the modding community several times over the past year" },
  { "kind": "quote",
    "quote": "It would seem that in order for the game designers to create realistic police it was necessary to hard code their relationships such that under no circumstances will they fight one other." },

  // ---- The Counter-Productivity Suite ----
  { "kind": "section", "title": "What is the Counter-Productivity Suite?",
    "sub": "an open source toolkit that attempts to shift the balance of power in the workplace" },
  { "kind": "image", "src": "media/floodnet.jpg",
    "caption": "FloodNet (Ricardo Dominguez and Electronic Disturbance Theater): a \"virtual sit-in\"" },
  { "kind": "image", "src": "media/etoy.jpg",
    "caption": "The eToy war gamified the devaluing of an e-commerce company's stock" },

  // ---- History of Sabotage ----
  { "kind": "textimg", "src": "media/sabotage-etymology.png",
    "title": "History of Sabotage",
    "body": [
      "The root of \"sabotage\" is an old French word for shoe, \"sabot\".",
      "When the peasants arrived in Industrial Paris to meet unfair labor conditions they resorted to disrupting the means of production, at times by throwing their wooden shoes into the machinery."
    ] },

  // ---- Prototypes ----
  { "kind": "section", "title": "Prototypes" },
  { "kind": "text", "prose": true, "title": "WiFi jammer",
    "body": [
      "A device that brings down any WiFi network in an office.",
      "The political-historical trajectory of the clog could be contemporaneously imagined as a pair of shoes with the requisite electronics hidden in the sole, granting any employee the ability to disable a wireless network simply by walking into the workplace."
    ] },
  { "kind": "image", "src": "media/printer.png",
    "caption": "A printer hack that makes the printer precede any job with a page of your choosing" },
  { "kind": "image", "src": "media/slack1.png",
    "caption": "Slack anti-boss cypher" },
  { "kind": "image", "src": "media/slack2.png",
    "caption": "A daily cypher circulated on paper, and a basic website to encrypt and decrypt" },

  // ---- Interventions ----
  { "kind": "section", "title": "Interventions" },
  { "kind": "image", "src": "media/haacke-ipad-survey.jpg",
    "caption": "Hans Hack: iPad survey for Hans Haacke’s new work at New Museum (2020)" },
  { "kind": "image", "src": "media/haacke-q14-after.png",
    "caption": "survey question #14 (after)" },
  { "kind": "image", "src": "media/newmuseum-net.jpg",
    "caption": "newmuseum.net (Artists for Workers)", "link": "https://newmuseum.net/" },

  // ---- Next ----
  { "kind": "text", "prose": true, "title": "Mapping the workplace",
    "body": [
      "Draw out the various areas of the workplace, the offices upstairs, the custodial closet, the boss's corner office, and who works in each area.",
      "Assign point values to each worker that denote how enthusiastic they are about unionizing. A 5 is like \"hell yes I am down\" and a 1 is like \"I will tell the boss on you\".",
      "It's more useful to talk a 3 into being a 4 than a 1 into being a 2."
    ] }
];
