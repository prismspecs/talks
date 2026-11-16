// Critical Automation. University of Television and Film Munich (HFF), 2024.
// No slide file survives. This follows the talk outline (Munich_Presentation/Presentation.md:
// sections I-III) and the closing sections of the talk notes, using the outline's own wording.
window.SLIDES = [
  { "kind": "cover", "title": "Critical Automation",
    "byline": "Grayson Earle · University of Television and Film Munich, 2024" },

  // ---- I. Technology as a product of culture and politics ----
  { "kind": "quote", "title": "Technology as a Product of Culture and Politics",
    "quote": "The more that something seems to be “without politics”, the more potently it is reinforcing the status quo." },
  { "kind": "list", "title": "Three layers of politics embedded in technology", "items": [
    { "term": "Material: ", "body": "the extraction of rare minerals, reliance on exploitative labor practices, and global supply chains." },
    { "term": "Architecture: ", "body": "structural design choices, from the Cartesian screen layout (0,0 as the top left of a screen) to the shape of neural networks and default settings in software." },
    { "term": "Information: ", "body": "biased training data, data privacy norms, surveillance practices." }
  ] },

  // ---- II. Haraway ----
  { "kind": "section", "title": "Donna Haraway", "sub": "A Cyborg Manifesto" },
  { "kind": "text", "title": "The cyborg as a site of resistance",
    "body": [
      "While technologies inherit cultural scripts from these layers, they also open spaces for disruption, resistance, and redefinition.",
      "The cyborg as a hybrid figure disrupts traditional boundaries, creating potential for reshaping social relations, particularly around gender, race, and identity.",
      "Technology becomes a space for questioning and revising the politics embedded within it."
    ] },

  // ---- III. Interventions in each layer ----
  { "kind": "section", "title": "Interventions", "sub": "material · architecture · information" },
  { "kind": "image", "src": "media/floodnet.jpg",
    "caption": "Material: FloodNet (Electronic Disturbance Theater)" },
  { "kind": "quote",
    "quote": "If the new tech isn’t true artificial intelligence, then what is it? In my view, the most accurate way to understand what we are building today is as an innovative form of social collaboration.",
    "attribution": "Jaron Lanier" },
  { "kind": "image", "src": "media/synthetic-messenger.jpg",
    "caption": "Architecture: Synthetic Messenger (Tega Brain & Sam Lavigne, 2021)",
    "link": "https://lav.io/projects/synthetic-messenger/" },
  { "kind": "image", "src": "media/coppelganger.gif",
    "caption": "Architecture: Coppelgänger (Sam Lavigne): which NYPD officer does a machine learning model think you most resemble?",
    "link": "https://lav.io/projects/coppelganger/" },
  { "kind": "side", "src": ["media/bw-smaller.jpg", "media/coplookalike.png"],
    "caption": "Coppelgänger (Sam Lavigne)" },
  { "kind": "image", "src": "media/cops-screenshot.jpg",
    "caption": "Information: Why don’t the cops fight each other? (2022)" },
  { "kind": "video", "src": "https://player.vimeo.com/video/871904228",
    "caption": "Why don’t the cops fight each other? (2022)" },
  { "kind": "text", "title": "Boogaloo Bias", "sub": "Derek Curry & Jennifer Gradecki",
    "body": [
      "Examines bias in AI model outputs, emphasizing the social consequences of biased training data on public perception and security practices."
    ] },

  // ---- Closing ----
  { "kind": "text", "title": "On Exactitude in Science", "sub": "Jorge Luis Borges, 1946",
    "body": [
      "An empire creates a map so detailed that it covers the entire territory of the empire itself.",
      "Machine forgetting, and the process of so-called optimization as a cultural artifact."
    ] },
  { "kind": "text", "title": "Demand Full Automation", "sub": "Nick Srnicek & Alex Williams, Inventing the Future",
    "body": [
      "Full automation as a means to achieve a post-capitalist society, reducing the necessity of human labor.",
      "Who benefits from the systems we build, and at what cost?"
    ] }
];
